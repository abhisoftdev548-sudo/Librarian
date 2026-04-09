import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.js";
import crypto from "crypto";

export const sendAuthResponse = async (user, req, res, statusCode = 200, message) => {
    const MaxSession = 5;
    const userAgent = req.get("User-Agent");
    const ip = req.ip

    try{

        
        const refreshToken = jwt.sign({id: user._id,}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({user: user._id, revoked: false, userAgent})
    if(session){
        session.ip = ip;
        session.refreshTokenHash = refreshTokenHash;
        session.lastUsed = Date.now();
        await session.save();
    } else {
        const sessionCount = await sessionModel.countDocuments({user: user._id, revoked: false});
        if(sessionCount >= MaxSession){
            const oldestSession = await sessionModel.findOne({user: user._id, revoked: false}).sort({lastUsed: 1});
            if(oldestSession){
                await sessionModel.findByIdAndDelete(oldestSession._id);
            }
        }
        await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip,
            userAgent
        })
        
    }
    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "15m"});
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return res.status(statusCode).json({
        message,
        accessToken,
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}catch(error){
    console.error("Error in sendAuthResponse:", error);
    return res.status(500).json({message: "Internal Server Error"});    
}
}
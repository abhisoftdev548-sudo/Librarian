import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.ts";
import crypto from "crypto";
import type { Request, Response} from 'express';
import ErrorHandler from "./ErrorHandler.ts";
export const sendAuthResponse = async (user:IUserDocument, req: Request, res: Response, ) => {
    const MaxSession = 5;
    const userAgent = req.get("User-Agent");
    const ip = req.ip
    if(!userAgent || !ip){
       throw new ErrorHandler("User-Agent and IP are required", 401);
    }
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if(!refreshSecret){
            throw new ErrorHandler("JWT_REFRESH_SECRET is not defined", 400);
        }
        
        const refreshToken = jwt.sign({id: user._id,}, refreshSecret, {expiresIn: "7d"});
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({user: user._id, revoked: false, userAgent})
    if(session){
        session.ip = ip;
        session.refreshTokenHash = refreshTokenHash;
        session.lastUsed = new Date();
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

    const accessSecret = process.env.JWT_SECRET;
    if(!accessSecret){
        throw new ErrorHandler("JWT_SECRET is not defined", 400);
    }
    const accessToken = jwt.sign({id: user._id}, accessSecret, {expiresIn: "15m"}) as string;
    if(!accessToken){
        throw new ErrorHandler("Access token could not be created", 400);
    }
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return accessToken
   

}
import type { Request, Response} from "express";
import { sendEmailOtp } from "../utils/sendEmailOtp.ts";
import { generateOtp, generateHtmlOtp, generateHtmlResetPassword } from "../utils/otpGeneration.ts";
import otpModel from "../models/optModel.ts";
import userModel from "../models/userModel.ts";
import crypto from "crypto";
import ErrorHandler from "../utils/ErrorHandler.ts";
import { sendAuthResponse } from "../utils/sendAuthResponse.ts";
import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.ts";
import { OAuth2Client } from "google-auth-library";
class AuthService {

    static async ragisterUser(userData: IUserDocument, res: Response) {
      if(!userData.username || !userData.email || !userData.password){
        throw new ErrorHandler("Please fill all the fields", 400);
      }
        const isExistingUser = await userModel.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });
          if (isExistingUser) {
            throw new ErrorHandler("User already exists", 403);
          }
        
        const newUser = await userModel.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            description: userData.description,
          });
          
        const otp = generateOtp();
        const otpHash = crypto.createHash("sha256").update(otp).digest('hex');
        await otpModel.create({
            email: userData.email,
            user: newUser._id,
            otpHash
        });
        const subjectEmail = "Your OTP for varification";
        const message =  `Your OTP for BT-Notes is ${otp}. It is valid for 10 minutes. If you did not request this, please ignore this email.`;
        const html = generateHtmlOtp(otp);
        await sendEmailOtp(userData.email, subjectEmail, message, html);
          
       return newUser;

          
       
    }

    static async loginUser(userData: IUserDocument, req:Request, res:Response){

      const email = userData.email
      const password = userData.password
       if (!email || !password) {
       throw new ErrorHandler("Please provide email and password", 400);
       }



    const user: IUserDocument = await userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new ErrorHandler("User not found", 404);
  }

  // loginUserController ke andar user find karne ke baad
  if (!user.password && user.googleId) {
    throw new ErrorHandler("user password is not get login with google", 403);
}
  if(!user.verified){
    throw new ErrorHandler("user is not verified", 403)
  }
  
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ErrorHandler("Invalid password", 401);
  }

  const accessToken = await sendAuthResponse( user, req, res);

  return {user, accessToken};
 
    }

    static async verifyEmail(email: string, otp: number,  req: Request, res: Response){

        if(!email || !otp){
          throw new ErrorHandler("Please provide email and otp", 400);
        }
      
    const otpHash = crypto.createHash("sha256").update(otp.toString()).digest('hex');
  const otpRecord = await otpModel.findOne({ email, otpHash: otpHash });
  if(!otpRecord){
    throw new ErrorHandler("Invalid OTP", 400);
  }

  const user = await userModel.findByIdAndUpdate(otpRecord.user, {verified: true}, {new: true}) as IUserDocument
  
  if(!user){
    throw new ErrorHandler("User not found", 404)
  }

  const accessToken = await sendAuthResponse(user, req, res);
  await otpModel.deleteMany({ email }); // Sirf ek nahi, saare delete karein

  return {user, accessToken};
    }

    static async getUser(accessToken: string){

      const secret = process.env.JWT_SECRET;
      if(!secret){
        throw new  ErrorHandler("JWT_SECRET is not defined", 400);
      }
        const decoded = jwt.verify(accessToken, secret) as MyTokenPayload;
        
        const user = await userModel.findById(decoded.id);
        if(!user){
          throw new ErrorHandler("User not found", 404);
        }
        return user;
   
    }

    static async logoutUser(refreshToken: string, res: Response){
       if (!refreshToken) {
          throw new ErrorHandler("No refresh token provided", 400);
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex');
        const session = await sessionModel.findOne({ refreshTokenHash, revoked: false });
        if (!session) {
          throw new ErrorHandler("session not found or worng refresh token", 400);
        }
        
        session.revoked = true;
        await session.save();
        res.clearCookie("refreshToken");
        return;
    }

    static async logoutAllUser(refreshToken: string, res: Response){
       if (!refreshToken) {
    throw new ErrorHandler("No refresh token provided", 400);
  }
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  if (!refreshSecret) {
    throw new ErrorHandler("JWT_REFRESH_SECRET is not defined", 400);
  }
  const decoded = jwt.verify(refreshToken, refreshSecret) as MyTokenPayload;
  await sessionModel.updateMany({ user: decoded.id }, { revoked: true });
  res.clearCookie("refreshToken");

  return;
    }

    static async newAccessToken(refreshToken: string, res: Response){
      if (!refreshToken) {
          throw new ErrorHandler("refresh token is not provided", 400);
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex');
        const session = await sessionModel.findOne({ refreshTokenHash, revoked: false });
        if (!session) {
          throw new ErrorHandler("session not found or worng refresh token", 400);
        }
        
          const refreshSecret = process.env.JWT_REFRESH_SECRET;
          if (!refreshSecret) {
            throw new ErrorHandler("JWT_REFRESH_SECRET is not defined", 400);
          }
          const accessSecret = process.env.JWT_SECRET;
          if(!accessSecret){
            throw new ErrorHandler("JWT_SECRET is not defined", 400);
          }
          const decoded = jwt.verify(refreshToken, refreshSecret) as MyTokenPayload;
      
          const accessToken = jwt.sign({ id: decoded.id }, accessSecret, {
            expiresIn: "15m",
          });
      
          const newRefreshToken = jwt.sign(
            { id: decoded.id },
            refreshSecret,
            { expiresIn: '7d'},
          );
      
          const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest('hex');
          session.refreshTokenHash = newRefreshTokenHash;
          session.lastUsed = new Date();
          await session.save();
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          return accessToken
    }

    static async resendUserOtp(email: string){
      if (!email) {
        throw new ErrorHandler("Please provide email", 400)
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new ErrorHandler("User not found", 404)
    }
   if(user.verified){
      throw new ErrorHandler("User is already verified", 400)
   }
   await otpModel.deleteMany({ email }); // Purane OTPs delete karo
   const otp = generateOtp();
   const otpHash = crypto.createHash("sha256").update(otp).digest('hex');
   await otpModel.create({
    email,
    user: user._id,
    otpHash
  });
  const otpMessage = `Your OTP is ${otp}`
  const otpsubject = "Resent OTP"
  const otpHtml = generateHtmlOtp(otp)
  await sendEmailOtp(email, otpsubject, otpMessage, otpHtml);
  return otp;
    }

    static async forgetPassword(email: string){
       if (!email) {
        throw new ErrorHandler("Please provide email", 400)   
       }
        const user = await userModel.findOne({ email });
        if (!user) {
        throw new ErrorHandler("User not found", 400)
        }

  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpire = new Date( Date.now()+ 60 * 60 * 1000); // 1 hour
  const resetPasswordTokenHash = crypto.createHash("sha256").update(resetPasswordToken).digest('hex');

  user.resetPasswordToken = resetPasswordTokenHash;
  user.resetPasswordExpire = resetPasswordExpire;
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetPasswordToken}`
  const message = `Aapne password reset request ki hai. Naya password banane ke liye niche diye gaye link par click karein (Valid for 15 min): \n\n ${resetUrl}`;
  const html = generateHtmlResetPassword(resetPasswordToken);
  const subjectResetPassword = "BT-Notes Password Reset Request";
  await sendEmailOtp(user.email, subjectResetPassword, message, html);
   return resetUrl as string;
  }

  static async resetPassword(resetPasswordToken: string, newPassword: string){
    
      const resetPasswordTokenHash = crypto.createHash("sha256").update(resetPasswordToken).digest('hex');
      const user = await userModel.findOne({resetPasswordToken: resetPasswordTokenHash, resetPasswordExpire: { $gt: Date.now() } });
      if (!user) {
        throw new ErrorHandler("Invalid or expired reset password token", 400);
      }
    
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.verified = true;
      await user.save();
      await sessionModel.updateMany({ user: user._id }, { revoked: true });

      return user;
  }

  static async googleAuthUser(idToken: string, req: Request, res: Response){
     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const decoded = jwt.decode(idToken); 

  const ticket = await client.verifyIdToken({
    idToken,
    // audience: process.env.GOOGLE_CLIENT_ID, // whien this is commetted then it works but when this is uncommented then it gives error "Invalid token" and in the console it shows "Token ke andar ki Client ID: undefined" and "Aapke .env ki Client ID: 316947967051-m496jaeg9nmo57s9okqlpahoc9utpu9e.apps.googleusercontent.com"
  })
const payload = ticket.getPayload();

if (!payload || !payload.email || !payload.sub) {
    throw new ErrorHandler("Google account is incomplete", 400)
}
  const {email, name, sub:googleId} = payload;
  if(!email || !name || !googleId){
    throw new ErrorHandler("Google account is incomplete", 400);
  }

  let user = await userModel.findOne({email}) as IUserDocument;
  
  if(user){
    if(!user.googleId){
      user.googleId = googleId;
      user.verified = true;
      await user.save();
    }
  }else{
    // Aisa tab tak loop chalayein jab tak unique username na mil jaye
    const username = name.toLowerCase().replace(/\s/g, "") + googleId.slice(-4);
    user = await userModel.create({
      username,
      email,
      googleId,
      verified: true
    })
  }
    const accessToken = await sendAuthResponse(user, req, res);
    return {accessToken , user}
  }
}

export default AuthService
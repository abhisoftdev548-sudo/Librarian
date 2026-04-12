import userModel from "../../models/userModel.ts";
import otpModel from "../../models/optModel.ts";
import jwt from "jsonwebtoken";
import sessionModel from "../../models/sessionModel.ts";
import crypto from "crypto";
import { generateOtp, generateHtmlOtp, generateHtmlResetPassword } from "../../utils/otpGeneration.ts";
import { sendEmailOtp } from "../../utils/sendEmailOtp.ts";
import { OAuth2Client } from "google-auth-library";
import { sendAuthResponse } from "../../utils/sendAuthResponse.ts";

import type { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from "../../utils/catchAsyncError.ts";
import ErrorHandler from "../../utils/ErrorHandler.ts";
import AuthService from "../../services/auth.services.ts";
import { ApiResponse } from "../../utils/apiResponse.ts";


interface ResetRequestParams {
  resetPasswordToken?: string;  // '?' lagane se ye optional ho jayega
    resetPasswordExpire?: Date;
}

const registerUserController = catchAsyncError( async (req: Request, res: Response) => {
  const { username, email, password, description } = req.body;

 const newUser = await AuthService.ragisterUser({username, email, password, description} as IUserDocument, res)

  res.status(201).json(
        new ApiResponse(201, newUser, "User registered successfully")
    );
 
});

const loginUserController = catchAsyncError( async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const {user, accessToken} = await AuthService.loginUser({email, password} as IUserDocument, req, res)

  res.status(200).json(
        new ApiResponse(200, {user, accessToken}, "User logged in successfully")
    );
  

})

const getUserController = catchAsyncError(async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "No access token provided" });
    }
   const user = await AuthService.getUser(accessToken);

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

const refreshTokenController = catchAsyncError(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = await AuthService.newAccessToken(refreshToken, res)
    res.status(200).json(new ApiResponse(200, {accessToken}, "New access token generated successfully"));

});

const logoutController = catchAsyncError(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
 await AuthService.logoutUser(refreshToken, res);
 res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
});

const logoutAllController = catchAsyncError( async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  await AuthService.logoutAllUser(refreshToken, res);
  res.status(200).json(new ApiResponse(200, null, "User logged out of all devices successfully"));
});

const verifyEmailController = catchAsyncError(async (req: Request, res: Response) => {
  const {email, otp} = req.body;

  const {user, accessToken} = await AuthService.verifyEmail(email, otp, req,  res)

  return res.status(200).json(
    new ApiResponse(200, {user, accessToken}, "Email verified successfully")
  )
 
 return 
});


const resentOtpController = catchAsyncError(async (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = await AuthService.resendUserOtp(email)
  res.status(200).json(new ApiResponse(200, {otp}, "Otp resent successfully"));
})

const forgetPasswordController = catchAsyncError(async (req: Request, res: Response) => {
  const { email } = req.body;
 const resetUrl = await AuthService.forgetPassword(email)
  res.status(200).json(new ApiResponse(200, {resetUrl}, "Password reset link sent successfully"));
});

const resetPasswordController =  catchAsyncError(async (req: Request<ResetRequestParams>, res: Response, next: NextFunction) => {
 const {resetPasswordToken}  = req.params;
 const { newPassword } = req.body;
  if (!resetPasswordToken) {
         throw new ErrorHandler("Please provide reset password token", 400);
     }
       if (!newPassword) {
         throw new ErrorHandler("Please provide new password", 400);
       }
  const user = await AuthService.resetPassword(resetPasswordToken, newPassword)
  res.status(200).json(new ApiResponse(200, user, "Password reset successfully"));
});

const googleAuthController = catchAsyncError( async (req: Request, res: Response) => {
  const { idToken } = req.body;
 const {user, accessToken} = await AuthService.googleAuthUser(idToken, req, res)

 res.status(201).json(new ApiResponse(201, {user, accessToken}, "User logged in successfully"));
})
const authController = { registerUserController, refreshTokenController, getUserController, logoutController, loginUserController, logoutAllController, verifyEmailController, resentOtpController, forgetPasswordController, resetPasswordController, googleAuthController };
export default authController;

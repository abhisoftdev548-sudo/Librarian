import userModel from "../models/userModel.js";
import otpModel from "../models/optModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.js";
import crypto from "crypto";
import { generateOtp, generateHtmlOtp, generateHtmlResetPassword } from "../utils/otpGeneration.js";
import { sendEmailOtp } from "../utils/sendEmailOtp.js";
import { OAuth2Client } from "google-auth-library";
import { send } from "process";
import { sendAuthResponse } from "../utils/sendAuthResponse.js";
/**
 * The function `registerUserController` handles user registration by checking for existing users,
 * creating a new user, generating and sending an OTP for verification via email.
 * @param req - The `req` parameter in the `registerUserController` function represents the request
 * object in Express.js. It contains information about the HTTP request made to the server, including
 * the request headers, body, parameters, query strings, etc. In this function, `req.body` is used to
 * extract the data
 * @param res - The `res` parameter in the `registerUserController` function is the response object
 * that will be used to send a response back to the client making the request. It is typically used to
 * set the status code, send data, and end the response in an Express.js application.
 * @returns The `registerUserController` function returns a JSON response with a status code and
 * message based on the conditions checked during user registration. If the required fields are not
 * filled, it returns a 400 status with a message to fill all fields. If the user already exists, it
 * returns a 400 status with a message indicating that the user already exists. If the user
 * registration is successful, it returns a
 */
const registerUserController = async (req, res) => {
  const { username, email, password, description } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const isExistingUser = await userModel.findOne({ $or: [{ email }, { username }] });
  if (isExistingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

try{

  const newUser = await userModel.create({
    username,
    email,
    password,
    description,
  });
  
  const otp = generateOtp();
  const otpHash = crypto.createHash("sha256").update(otp).digest('hex');
  await otpModel.create({
    email,
    user: newUser._id,
    otpHash
  });
  const subjectEmail = "Your OTP for varification";
  const message =  `Your OTP for BT-Notes is ${otp}. It is valid for 10 minutes. If you did not request this, please ignore this email.`;
  const html = generateHtmlOtp(otp);
  try {
      await sendEmailOtp(email, subjectEmail, message, html);
    } catch (emailError) {
      // Agar email fail ho jaye toh production mein hum log karte hain
      // aur user ko batate hain ki wo 'Resend OTP' use kare
      console.error("Email Sending Failed:", emailError);
    }
  res
  .status(201)
  .json({
    message: "User registered successfully",
    
    user: {
      id: newUser._id,
      email:newUser.email,
      username: newUser.username,
      description: newUser.description || ""
    },
  });
}catch(error){
  console.error("Error :", error);
  return res.status(500).json({ message: error.message });
}
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try{

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
  }
  // loginUserController ke andar user find karne ke baad
  if (!user.password && user.googleId) {
    return res.status(400).json({ 
    message: "Aapne Google se account banaya hai. Please 'Login with Google' use karein." 
  });
}
  if(!user.verified){
    return res.status(403).json({ message: "Please verify your email before logging in" });
  }
  
  const isPasswordValid = await   bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "wrong password or email" });
  }
  await sendAuthResponse(user, req, res, 200, "User logged in successfully");
}catch(error){
  console.error("Error in loginUserController:", error);
  return res.status(500).json({ message: "Internal Server Error" });
}
}
const getUserController = async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "No access token provided" });
    }
    try {        
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded.id).select("-password");
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid access token", error: error.message });
    }
}

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex');
  const session = await sessionModel.findOne({ refreshTokenHash, revoked: false });
  if (!session) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d'},
    );

    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest('hex');
    session.refreshTokenHash = newRefreshTokenHash;
    session.lastUsed = Date.now();
    await session.save();
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
} catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
}
};

const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex');
  const session = await sessionModel.findOne({ refreshTokenHash, revoked: false });
  if (!session) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }
  session.revoked = true;
  await session.save();
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
}

const logoutAllController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  await sessionModel.updateMany({ user: decoded.id }, { revoked: true });
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "All sessions logged out successfully" });
}

const verifyEmailController = async (req, res) => {
  const {email, otp} = req.body;
  if(!email || !otp){
    return res.status(400).json({ message: "Please provide email and otp" });
  }
  const otpHash = crypto.createHash("sha256").update(otp.toString()).digest('hex');
  const otpRecord = await otpModel.findOne({ email, otpHash: otpHash });
  if(!otpRecord){
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await userModel.findByIdAndUpdate(otpRecord.user, {verified: true}, {new: true})
  

  //   const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "7d",
  // });

  // const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex');
  // const session = await sessionModel.create({
  //   user: user._id,
  //   refreshTokenHash: refreshTokenHash,
  //   ip: req.ip,
  //   userAgent: req.headers["user-agent"],
  // })
  // const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "15m",
  // });
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });
 
  const response = await sendAuthResponse(user, req, res, 200, "Email verified successfully");
  await otpModel.deleteMany({ email }); // Sirf ek nahi, saare delete karein

 return response
}


const resentOtpController = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Please provide email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
   if(user.verified){
    return res.status(400).json({ message: "Email already verified" });
   }
   await otpModel.deleteMany({ email }); // Purane OTPs delete karo
   const otp = generateOtp();
   const otpHash = crypto.createHash("sha256").update(otp).digest('hex');
   await otpModel.create({
    email,
    user: user._id,
    otpHash
  });
  await sendEmailOtp(email, otp);
  res.status(200).json({ message: "OTP resent successfully" });
}

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please provide email" });   
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  const resetPasswordTokenHash = crypto.createHash("sha256").update(resetPasswordToken).digest('hex');

  user.resetPasswordToken = resetPasswordTokenHash;
  user.resetPasswordExpire = resetPasswordExpire;
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetPasswordToken}`
  const message = `Aapne password reset request ki hai. Naya password banane ke liye niche diye gaye link par click karein (Valid for 15 min): \n\n ${resetUrl}`;
  const html = generateHtmlResetPassword(resetPasswordToken);
  const subjectResetPassword = "BT-Notes Password Reset Request";
  await sendEmailOtp(user.email, subjectResetPassword, message, html);
  res.status(200).json({ message: "Password reset link sent successfully" });
}

const resetPasswordController = async (req, res) => {
 const {resetPasswordToken} = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ message: "Please provide new password" });
  }
  const resetPasswordTokenHash = crypto.createHash("sha256").update(resetPasswordToken).digest('hex');
  const user = await userModel.findOne({resetPasswordToken: resetPasswordTokenHash, resetPasswordExpire: { $gt: Date.now() } });
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.verified = true;
  await user.save();
  await sessionModel.updateMany({ user: user._id }, { revoked: true });
  res.status(200).json({ message: "Password reset successfully Please login" });
}

const googleAuthController = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { idToken } = req.body;
const decoded = jwt.decode(idToken); 

  const ticket = await client.verifyIdToken({
    idToken,
    // audience: process.env.GOOGLE_CLIENT_ID, // whien this is commetted then it works but when this is uncommented then it gives error "Invalid token" and in the console it shows "Token ke andar ki Client ID: undefined" and "Aapke .env ki Client ID: 316947967051-m496jaeg9nmo57s9okqlpahoc9utpu9e.apps.googleusercontent.com"
  })

  const {email, name, sub:googleId} = ticket.getPayload();
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  let user = await userModel.findOne({email})
  
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
return sendAuthResponse(user, req, res, 200, "User logged in with Google successfully");
}
const authController = { registerUserController, refreshTokenController, getUserController, logoutController, loginUserController, logoutAllController, verifyEmailController, resentOtpController, forgetPasswordController, resetPasswordController, googleAuthController };
export default authController;

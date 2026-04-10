import express from 'express';
import authController from '../controllers/auth.controller.js';
import rateLimitingMiddleware from '../middlewares/rateLimitingMiddleware.js';

const router = express.Router();
router.post('/register', authController.registerUserController);

router.get('/refresh-token', authController.refreshTokenController);

router.get('/get-me', authController.getUserController);

router.post('/logout', authController.logoutController);

router.get('/login', authController.loginUserController);

router.post('/logout-all', authController.logoutAllController);

router.post('/verify-email', authController.verifyEmailController);

router.post('/resend-otp', rateLimitingMiddleware, authController.resentOtpController);

router.post('/forget-password', authController.forgetPasswordController);

router.post('/reset-password/:resetPasswordToken', authController.resetPasswordController);

router.post('/google-auth', authController.googleAuthController);
export default router;
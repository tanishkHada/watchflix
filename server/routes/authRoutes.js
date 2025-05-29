import express from 'express';
import authController from '../controllers/authController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verify', authController.verify);
router.post('/resend-verification-code', authController.resendVerificationCode);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', authController.logout);
router.get('/validate', authenticate, authController.validate);

export default router; 
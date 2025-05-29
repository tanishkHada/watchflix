import crypto from 'crypto';
import VerificationUser from '../models/VerificationUser.js';
import sendEmail from '../utils/sendMail.js';

const generateCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

const createVerification = async (email, purpose) => {
    try {
        const code = generateCode().toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await VerificationUser.findOneAndUpdate(
            { email, purpose },
            { code, expiresAt },
            { upsert: true, new: true }
        );

        await sendEmail(email, code, purpose);

        return code;
    } catch (error) {
        console.error('Error in createVerification:', error);
        throw new Error('Failed to create verification code');
    }
};

const verifyCode = async (email, code, purpose) => {
    try {
        const verification = await VerificationUser.findOne({
            email,
            code,
            purpose,
            expiresAt: { $gt: new Date() }
        });

        if (!verification) {
            throw new Error('Invalid or expired verification code');
        }

        await VerificationUser.deleteOne({ _id: verification._id });
        return true;
    } catch (error) {
        console.error('Error in verifyCode:', error);
        throw new Error('Failed to verify code');
    }
};

const verificationService = { createVerification, verifyCode };
export default verificationService;
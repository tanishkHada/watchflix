import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    purpose: { type: String, enum: ['register', 'forgotPassword'], required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const VerificationUser = mongoose.model('Verification', verificationSchema);

export default VerificationUser;

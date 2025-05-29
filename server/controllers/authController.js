import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import PendingUser from '../models/PendingUser.js';
import verificationService from '../services/verificationService.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            throw new Error('User with this email doesn\'t exist');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new Error('Invalid Credentials');
        }

        const payload = {
            userId: user._id,
            username: user.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 * 30
        });

        res.status(200).json({success: true, message: 'Logged in'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});        
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await PendingUser.findOneAndUpdate(
            { email },
            { name, email, password: hashedPassword },
            { upsert: true }
        );

        await verificationService.createVerification(email, 'register');

        res.status(200).json({ success: true, message: 'Verification email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const verify = async (req, res) => {
    try {
        const { email, code, currAuthContext } = req.body;

        await verificationService.verifyCode(email, code, currAuthContext);

        switch(currAuthContext) {
            case 'register':
                return await handleRegistrationVerification(email, res);
            case 'forgotPassword': 
                return await handleForgotPasswordVerification(res);
            default: 
                return res.status(400).json({message: 'Invalid verification context'});
        }       
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const resendVerificationCode = async (req, res) => {
    try {
        const { email, currAuthContext } = req.body;
        await verificationService.createVerification(email, currAuthContext);
        res.status(200).json({success: true, message: 'Resent verfification email'});
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await verificationService.createVerification(email, 'forgotPassword');
        res.status(200).json({ success: true, message: 'Password reset code sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const validate = (req, res) => {
    res.status(200).json({success: true, message: 'Validated'});
}

const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        });
        res.status(200).json({success: true, message: 'logged out'});
    } catch (error) {
        res.status(500).json({message: 'error loggin out'});        
    }
}

/**** helpers *****/

const handleRegistrationVerification = async (email, res) => {
    const tempUser = await PendingUser.findOne({ email });
    if (!tempUser) {
        return res.status(400).json({ message: 'Registration data not found' });
    }

    const user = await User.create({
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        verified: true
    });

    await PendingUser.deleteOne({ email });

    res.status(200).json({ success: true, message: 'Registration successful', user });
}

const handleForgotPasswordVerification = async (res) => {
    res.status(200).json({success: true, message: "Verfied for password reset"});
}

const authController = {
    login,
    register,
    verify,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    validate,
    logout
}

export default authController;
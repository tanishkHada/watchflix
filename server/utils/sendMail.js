import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email, code, purpose) => {
    const templates = {
        register: {
            subject: 'Verify Your Account',
            text: `Your account verification code is: ${code}`,
            html:
                `<div><h2>Account Verification</h2><p>Your code is: <strong>${code}</strong></p></div>`
        },
        forgotPassword: {
            subject: 'Password Reset Verification',
            text: `Your password reset code is: ${code}`,
            html:
                `<div><h2>Password Reset</h2><p>Your verification code is: <strong>${code}</strong></p></div>`
        }
    };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            ...templates[purpose]
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

export default sendEmail;
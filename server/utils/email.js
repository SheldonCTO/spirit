import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, 
        secure: process.env.EMAIL_SECURE === 'true', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
};
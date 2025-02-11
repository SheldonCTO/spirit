import jwt from 'jsonwebtoken';
import pool from '../utils/db.js';
import { sendVerificationEmail } from '../utils/email.js';

class EmailVerificationController {

    async sendVerificationEmail(user, token) {
        try {
            await sendVerificationEmail(user, token);
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
    }

    async verifyEmail(req, res) {
        
        const { token } = req.query;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const query = 'UPDATE users SET verified = true WHERE id = ?';
            const values = [decoded.id];

            await pool.query(query, values);

            res.send('Email verified successfully');
        } catch (error) {
            res.status(400).send('Invalid or expired token');
        }
    }

}

export default new EmailVerificationController();
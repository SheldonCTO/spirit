import bcrypt from 'bcrypt';
import pool from '../utils/db.js';
import { signToken, generateVerificationToken } from '../utils/jwt.js';
import { hashPassword } from '../utils/hashedPassword.js';
import EmailVerificationController from '../controllers/emailVerificationController.js';

class AuthService {
    constructor() {
        this.pool = pool;
    }

    async register(data) {
        const { email, password, role } = data;

        try {
            const hashedPassword = await hashPassword(password);
            const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
            const values = [email, hashedPassword, role];

            await this.pool.query(query, values);

            const token = generateVerificationToken(user);
            await EmailVerificationController.sendVerificationEmail(user, token);

            const [userResults] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);
            const user = userResults[0];

            return { message: 'User registered successfully. Please check your email to verify your account.' };
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    async login(data) {
        const { email, password } = data;

        const query = 'SELECT * FROM users WHERE email = ?';
        const values = [email];

        try {
            const [results] = await this.pool.query(query, values);

            if (results.length === 0) {
                throw new Error('User not found');
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                };
                const token = signToken(payload);
                return { message: 'Login successful', token };
            } else {
                throw new Error('Invalid password');
            }
        } catch (error) {
            throw new Error('Error checking user: ' + error.message);
        }
    }

}

export default AuthService;
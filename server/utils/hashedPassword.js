import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword) => {
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};

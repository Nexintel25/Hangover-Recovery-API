import UserModel from '../../models/auth/public.model.js';
import bcrypt from 'bcryptjs';

export async function userRegisterController(req, res) {
    try {
        const {
            email, mobile, password, fullName, address, city, state, pincode,
            emergencyName, emergencyPhone, habitual, frequency, dailyDrinks, preferredPlace, medicalHistory
        } = req.body;

        // Validate required fields
        if (!email || !mobile || !password || !fullName) {
            return res.status(400).json({ error: 'Missing required fields: Email, Mobile, Password, Full Name' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await UserModel.registerUser(
            email, mobile, hashedPassword, fullName, address, city, state, pincode,
            emergencyName, emergencyPhone, habitual, frequency, dailyDrinks, preferredPlace, medicalHistory
        );

        if (result.errorCode) {
            return res.status(400).json({ error: result.message });
        }

        return res.status(201).json({ message: 'User registered successfully', userId: result.userId, accountId: result.accountId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

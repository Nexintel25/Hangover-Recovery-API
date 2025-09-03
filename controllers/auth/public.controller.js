import UserModel from '../../models/auth/public.model.js';

export async function userRegisterController(req, res) {
    try {
        const {
            email, mobile, passwordHash, fullName, address, city, state, pincode,
            emergencyName, emergencyPhone, habitual, frequency, dailyDrinks, preferredPlace, medicalHistory
        } = req.body;

        if (!email || !mobile || !passwordHash || !fullName) {
            return res.status(400).json({ error: 'Missing required fields: Email, Mobile, Password Hash, Full Name' });
        }

        const result = await UserModel.registerUser(
            email, mobile, passwordHash, fullName, address, city, state, pincode,
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

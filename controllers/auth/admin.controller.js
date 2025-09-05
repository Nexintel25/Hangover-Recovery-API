import AdminModel from '../../models/auth/admin.model.js';
import bcrypt from 'bcryptjs';

export async function adminRegisterController(req, res) {

    try {
        const {
            email, mobile, password, fullName
        } = req.body;

        if (!email || !mobile || !password || !fullName) {
            return res.status(400).json({ error: 'Missing required fields: Email, Mobile, Password, Full Name' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        const result = await AdminModel.registerAdmin(
            email, mobile, passwordHash, fullName
        );

        if (result.errorCode) {
            return res.status(400).json({ error: result.message });
        }

        return res.status(201).json({ message: 'Admin registered successfully', adminId: result.adminId, accountId: result.accountId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
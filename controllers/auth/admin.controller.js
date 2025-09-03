import AdminModel from '../../models/auth/admin.model.js';

export async function adminRegisterController(req, res) {

    try {
        const {
            email, mobile, passwordHash, fullName
        } = req.body;
        
        if (!email || !mobile || !passwordHash || !fullName) {
            return res.status(400).json({ error: 'Missing required fields: Email, Mobile, Password Hash, Full Name' });
        }

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
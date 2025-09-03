import NurseModel from '../../models/auth/nurse.model.js';

export async function nurseRegisterController(req, res) {
    try {
        const {
            email, mobile, passwordHash, fullName, licenseNumber, experienceYears, specialization,
            address, bankDetails, workingHours, geoArea, profilePic
        } = req.body;

        if (!email || !mobile || !passwordHash || !fullName || !licenseNumber || !experienceYears || !specialization) {
            return res.status(400).json({ error: 'Missing required fields: Email, Mobile, Password Hash, Full Name, License Number, Experience Years, Specialization' });
        }

        const result = await NurseModel.registerNurse(
            email, mobile, passwordHash, fullName, licenseNumber, experienceYears, specialization,
            address, bankDetails, workingHours, geoArea, profilePic
        );

        if (result.errorCode) {
            return res.status(400).json({ error: result.message });
        }

        return res.status(201).json({ message: 'Nurse registered successfully', nurseId: result.nurseId, accountId: result.accountId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

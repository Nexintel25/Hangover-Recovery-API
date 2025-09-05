import CenterModel from '../../models/auth/center.model.js';
import bcrypt from 'bcryptjs';

export async function centerRegisterController(req, res) {
    try {
        const {
            email, password, centerName, contactPersonName, contactPersonPhone,
            address, city, state, centerType, availableRooms, services,
            pricingStructure, operatingHours, bankName, accountNumber, ifscCode, accountHolder
        } = req.body;

        // Add validation as needed
        if(!email || !password || !centerName || !contactPersonName || !contactPersonPhone || !address || !city || !state || !centerType) {
            return res.status(400).json({ error: 'Missing required fields : Email, Password, Center Name, Contact Person Name, Contact Person Phone, Address, City, State, Center Type' });
        }
        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        const result = await CenterModel.registerCenter(
            email, passwordHash, centerName, contactPersonName, contactPersonPhone,
            address, city, state, centerType, availableRooms, services,
            pricingStructure, operatingHours, bankName, accountNumber, ifscCode, accountHolder
        );

        if (result.errorCode) {
            return res.status(400).json({ error: result.message });
        }

        return res.status(201).json({ message: 'Center registered successfully', centerId: result.centerId, accountId: result.accountId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
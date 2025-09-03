import CenterModel from '../../models/auth/center.model.js';

export async function centerRegisterController(req, res) {
    try {
        const {
            email, passwordHash, centerName, contactPersonName, contactPersonPhone,
            address, city, state, centerType, availableRooms, services,
            pricingStructure, operatingHours, bankName, accountNumber, ifscCode, accountHolder
        } = req.body;

        // Add validation as needed
        if(!email || !passwordHash || !centerName || !contactPersonName || !contactPersonPhone || !address || !city || !state || !centerType) {
            return res.status(400).json({ error: 'Missing required fields : Email, Password Hash, Center Name, Contact Person Name, Contact Person Phone, Address, City, State, Center Type' });
        }

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
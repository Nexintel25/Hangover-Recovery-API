import pool from "../../config/database.js";

export default class Center {
    static async registerCenter(
        email, passwordHash, centerName, contactPersonName, contactPersonPhone,
        address, city, state, centerType, availableRooms, services,
        pricingStructure, operatingHours, bankName, accountNumber, ifscCode, accountHolder
    ) {
        const db = await pool.getConnection();

        const [rows] = await db.query(
            `CALL sp_RegisterTreatmentCenter(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @errorCode, @message, @account_id, @center_id); SELECT @errorCode AS errorCode, @message AS message, @account_id AS accountId, @center_id AS centerId;`,
            [
                email, passwordHash, centerName, contactPersonName, contactPersonPhone,
                address, city, state, centerType, availableRooms, services,
                pricingStructure, operatingHours, bankName, accountNumber, ifscCode, accountHolder
            ]
        );

        console.log("Center Registration Stored Procedure Result:", rows);

        const outParams = rows[1][0];
        return outParams;
    }
}
import pool from "../../config/database.js";


export default class Nurse {
    static async registerNurse(
        email, mobile, passwordHash, fullName, licenseNumber, experienceYears, specialization,
        address, bankDetails, workingHours, geoArea, profilePic
    ) {
        const [rows] = await pool.query(
            `CALL sp_RegisterNurse(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @errorCode, @message, @account_id, @nurse_id); SELECT @errorCode AS errorCode, @message AS message, @account_id AS accountId, @nurse_id AS nurseId;`,
            [
                email, mobile, passwordHash, fullName, licenseNumber, experienceYears, specialization,
                address, bankDetails, workingHours, geoArea, profilePic
            ]
        );
        const outParams = rows[1][0];
        return outParams;
    }
}


import pool from '../../config/database.js'

export default class User {

    static async registerUser(
        email, mobile, passwordHash, fullName, address, city, state, pincode,
        emergencyName, emergencyPhone, habitual, frequency, dailyDrinks, preferredPlace, medicalHistory
    ) {
        const [rows] = await pool.query(
            `CALL sp_RegisterUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @errorCode, @message, @account_id, @user_id); SELECT @errorCode AS errorCode, @message AS message, @account_id AS accountId, @user_id AS userId;`,
            [
                email, mobile, passwordHash, fullName, address, city, state, pincode,
                emergencyName, emergencyPhone, habitual, frequency, dailyDrinks, preferredPlace, medicalHistory
            ]
        );
        const outParams = rows[1][0];
        return outParams;
    }
    
}

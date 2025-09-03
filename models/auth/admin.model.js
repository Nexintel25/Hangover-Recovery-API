import pool from "../../config/database.js";

export default class Admin {
    static async registerAdmin(
        email, mobile, passwordHash, fullName
    ) {

        const db = await pool.getConnection();

        const [rows] = await db.query(
            `CALL sp_RegisterAdmin(?, ?, ?, ?, @errorCode, @message, @account_id, @admin_id); SELECT @errorCode AS errorCode, @message AS message, @account_id AS accountId, @admin_id AS adminId;`,
            [
                email, mobile, passwordHash, fullName
            ]
        );

        console.log("Admin Registration Stored Procedure Result:", rows);
        
        const outParams = rows[1][0];
        return outParams;
    }
}
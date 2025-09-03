import pool from "../../config/database.js";

export default class VerifyModel {
    static async verifyUser(identifier, passwordHash, roleId) {
        const db = await pool.getConnection();

        const [rows] = await db.query(
            `CALL sp_VerifyUser(?, ?, ?, @errorCode, @message); SELECT @errorCode AS errorCode, @message AS message;`,
            [identifier, passwordHash, roleId]
        );

        // The first result set may contain user info if credentials are valid
        const userInfo = rows[0][0] || null;
        const outParams = rows[1][0];
        return { userInfo, ...outParams };
    }
}
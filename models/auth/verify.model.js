import pool from "../../config/database.js";

export default class VerifyModel {
    static async verifyUser(identifier, roleId) {
        const db = await pool.getConnection();

        const [rows] = await db.query(
            `CALL sp_VerifyUser(?, ?, @errorCode, @message); SELECT @errorCode AS errorCode, @message AS message;`,
            [identifier, roleId]
        );

        console.log('Stored procedure result:', rows);
        // The first result set may contain user info if credentials are valid
        const userInfo = rows[0][0] || null;
        const outParams = rows[2][0];
        return { userInfo, ...outParams };
    }

    static async insertUserToken({ account_id, access_token, refresh_token, device_info, ip_address }) {
        const conn = await pool.getConnection();
        try {
            const [resultSets] = await conn.query(
                `CALL sp_insert_user_token(?, ?, ?, ?, ?, @errorCode, @errorMessage); SELECT @errorCode AS errorCode, @errorMessage AS errorMessage;`,
                [account_id, access_token, refresh_token, device_info, ip_address]
            );
            const output = resultSets[1]?.[0] || {};
            return {
                errorCode: output.errorCode,
                errorMessage: output.errorMessage,
            };
        } finally {
            conn.release();
        }
    };
}
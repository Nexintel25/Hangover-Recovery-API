import pool from "../../config/database.js";

export default class FeedbackModel {
    // Get feedback for a nurse
    static async getFeedbackForNurse(nurse_account_id) {
        const [rows] = await pool.query(
            `CALL sp_GetFeedbackForNurse(?)`,
            [nurse_account_id]
        );
        return rows[0]; // Feedback rows
    }

    static async createUserFeedback(user_account_id, nurse_account_id, rating, feedback) {
        const [rows] = await pool.query(
            `CALL sp_CreateUserFeedback(?, ?, ?, ?, @errorCode, @message); SELECT @errorCode AS errorCode, @message AS message;`,
            [user_account_id, nurse_account_id, rating, feedback]
        );
        return rows[1][0];
    }

}
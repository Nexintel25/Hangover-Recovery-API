import pool from "../../config/database.js";

export default class FeedbackModel {
    // Create nurse feedback
    static async createNurseFeedback(nurse_account_id, user_account_id, rating, feedback) {
        const [rows] = await pool.query(
            `CALL sp_CreateNurseFeedback(?, ?, ?, ?, @errorCode, @message); SELECT @errorCode AS errorCode, @message AS message;`,
            [nurse_account_id, user_account_id, rating, feedback]
        );
        return rows[1][0]; // OUT params
    }

    // Get feedback by a public user
    static async getFeedbackByUser(user_account_id) {
        const [rows] = await pool.query(
            `CALL sp_GetFeedbackByUser(?)`,
            [user_account_id]
        );
        return rows[0]; // Feedback rows
    }

    static async getFeedbackForUser(user_account_id = 0) {
        const [rows] = await pool.query(
            `CALL sp_GetFeedbackForUser(?)`,
            [user_account_id]
        );
        return rows[0];
    }

    // Create feedback for center
    static async createCenterFeedback(center_id, user_account_id, rating, feedback) {
        const [rows] = await pool.query(
            `CALL sp_CreateCenterFeedback(?, ?, ?, ?, @errorCode, @message); SELECT @errorCode AS errorCode, @message AS message;`,
            [center_id, user_account_id, rating, feedback]
        );
        return rows[1][0];
    }
}
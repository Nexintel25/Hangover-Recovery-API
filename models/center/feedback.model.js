import pool from "../../config/database.js";

export default class FeedbackModel {
    // Get feedback for center (all or by center_id)
    static async getFeedbackForCenter(center_id = 0) {
        const [rows] = await pool.query(
            `CALL sp_GetFeedbackForCenter(?)`,
            [center_id]
        );
        return rows[0];
    }
}
import pool from "../../config/database.js";

export default class Userstats {
    static async fetchUserStats() {
        // Call the stored procedure to get user stats
        const [rows] = await pool.query('CALL sp_public_user_stats()');
        // The result of a CALL is usually an array of arrays, so take the first result set
        const stats = rows[0][0];
        return {
            total_users: stats.total_users,
            total_active_users: stats.total_active_users,
            total_habitual: stats.total_habitual,
            total_bookings: stats.total_bookings
        };
    }
}
import pool from "../../config/database.js";

export default class NurseModel {
    // Fetch nurse stats: total, active, inactive, average rating
    static async fetchNurseStats() {
        const [rows] = await pool.query('CALL sp_nurse_stats()');
        const stats = rows[0][0];
        return {
            total_nurses: stats.total_nurses,
            active_nurses: stats.active_nurses,
            inactive_nurses: stats.inactive_nurses,
            avg_rating: stats.avg_rating
        };
    }

    // Fetch all nurses with their info, total bookings, and average rating
    static async fetchAllNursesWithStats() {
        const [rows] = await pool.query('CALL sp_GetAllNursesWithStats()');
        return rows[0];
    }
}
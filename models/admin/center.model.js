import pool from "../../config/database.js";

export default class CenterModel {
    // Treatment center stats
    static async fetchTreatmentCenterStats() {
        const [rows] = await pool.query('CALL sp_treatment_center_stats()');
        return rows[0][0];
    }

    // All treatment centers with stats
    static async fetchAllTreatmentCentersWithStats() {
        const [rows] = await pool.query('CALL sp_GetAllTreatmentCentersWithStats()');
        return rows[0];
    }
}
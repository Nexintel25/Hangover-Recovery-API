import NurseModel from "../../models/admin/nurse.model.js";

export async function fetchNurseStatsController(req, res) {
    try {
        const stats = await NurseModel.fetchNurseStats();
        return res.status(200).json({
            success: true,
            data: stats
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function fetchAllNursesWithStatsController(req, res) {
    try {
        const nurses = await NurseModel.fetchAllNursesWithStats();

        if (!nurses || nurses.length === 0) {
            return res.status(404).json({ error: "No nurses found." });
        }

        return res.status(200).json({
            success: true,
            data: nurses
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

import CenterModel from "../../models/admin/center.model.js";

// Treatment center stats
export const fetchTreatmentCenterStatsController = async (req, res) => {
    try {
        const stats = await CenterModel.fetchTreatmentCenterStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        console.error("Error fetching treatment center stats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

};

// All treatment centers with stats
export const fetchAllTreatmentCentersWithStatsController = async (req, res) => {
    try {
        const centers = await CenterModel.fetchAllTreatmentCentersWithStats();
        res.status(200).json({ success: true, data: centers });
    } catch (error) {
        console.error("Error fetching all treatment centers with stats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

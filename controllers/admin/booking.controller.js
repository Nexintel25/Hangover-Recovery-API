import Userstats from '../../models/admin/user.model.js';

export async function fetchBookingController(req, res) {
    try {
        const stats = await Userstats.fetchBookingStats();
        return res.status(200).json({
            success: true,
            data: stats
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

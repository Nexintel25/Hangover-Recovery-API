import Userstats from '../../models/admin/user.model.js';

export async function fetchUserStatsController(req, res) {
    try {
        const stats = await Userstats.fetchUserStats();
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

export async function fetchAllUsersController(req, res) {
    try {
        const users = await Userstats.fetchAllPublicUsersWithBookings();

        if (users.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No users found'
            });
        }

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



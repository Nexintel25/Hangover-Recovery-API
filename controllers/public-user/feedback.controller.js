import FeedbackModel from "../../models/public-user/feedback.model.js";

// Create nurse feedback
export async function createNurseFeedbackController(req, res) {
    const { nurse_account_id, user_account_id, rating, feedback } = req.body;
    if (!nurse_account_id || !user_account_id || !rating || !feedback) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    try {
        const result = await FeedbackModel.createNurseFeedback(nurse_account_id, user_account_id, rating, feedback);
        if (result.errorCode !== 0) {
            return res.status(400).json({ error: result.message });
        }
        return res.status(201).json({ message: result.message });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get feedback by a public user
export async function getFeedbackByUserController(req, res) {
    const user_account_id = req.body.user_account_id;
    if (!user_account_id) {
        return res.status(400).json({ error: "Missing user_account_id." });
    }
    try {
        const feedbacks = await FeedbackModel.getFeedbackByUser(user_account_id);
        return res.json(feedbacks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
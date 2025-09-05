import FeedbackModel from "../../models/nurse/feedback.model.js";


// Get feedback for a nurse
export async function getFeedbackForNurseController(req, res) {
    const nurse_account_id = req.body.nurse_account_id;
    if (!nurse_account_id) {
        return res.status(400).json({ error: "Missing nurse_account_id." });
    }
    try {
        const feedbacks = await FeedbackModel.getFeedbackForNurse(nurse_account_id);
        return res.json(feedbacks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            error: 'No token provided. Authentication required.',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded data to request
        next();
    } catch (err) {
        return res.status(401).json({
            error: err.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Invalid token.',
            success: false
        });
    }
};
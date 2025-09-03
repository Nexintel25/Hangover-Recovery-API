import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userVerifyController = async (req, res) => {

    const { user_name, password, roleId } = req.body;

    // Validate required fields
    if (!user_name && !roleId) {
        return res.status(400).json({
            error: 'Missing required fields: Both user_name and roleId are mandatory.',
        });
    }

    if (!password) {
        return res.status(400).json({
            error: 'Password is required.',
            success: false
        });
    }

    try {

        const data = await getUser({
            user_name,
            email,
        });

        if (data.errorCode === 1) {
            return res.status(404).json({
                error: 'User not found.',
                success: false
            });
        }

        // Compare password with hashed password
        const isMatch = password === data.password;

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid password.',
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_name: data.user_name, email: data.email, user_id: data.user_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION } // Token expiration time
        );

        const insertTokenRes = await insertToken({
            user_name: data.user_name,
            email: data.email,
            token
        });

        if (insertTokenRes.errorCode !== 0) {
            return res.status(500).json({
                error: 'Failed to insert token.',
                success: false
            });
        }

        // Attach token to cookie and return response
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 // 1 hour
        });

        return res.status(200).json({
            message: 'Login successful.',
            success: true,
            token: token,
            user: {
                user_id: data.user_id,
                user_name: data.user_name,
                email: data.email,
                roleId: data.roleId,
                user_type: data.user_type,
                assembly_id: data.assembly_id,
                district_id: data.district_id,
                state_id: data.state_id
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            error: 'Unexpected server error during login.',
            success: false
        });
    }
};

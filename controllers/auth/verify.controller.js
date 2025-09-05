import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import VerifyModel from '../../models/auth/verify.model.js';

dotenv.config();

export const userVerifyController = async (req, res) => {

    const { user_name, password, roleId, device_info, ip_address } = req.body;

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

        const data = await VerifyModel.verifyUser(user_name, roleId);

        if (data.errorCode !== 0) {

            return res.status(401).json({
                error: data.message,
                success: false
            });
        }

        if (!data.userInfo) {
            return res.status(401).json({
                error: 'Invalid credentials.',
                success: false
            });
        }

        const passwordMatch = await bcrypt.compare(password, data.userInfo.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid credentials.',
                success: false
            });
        }

        const access_token = JWT.sign(
            { user_id: data.userInfo.user_id, role_id: data.userInfo.role_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION_FOR_ACCESS_TOKEN } // Token expiration time
        );

        const refresh_token = JWT.sign(
            { user_id: data.userInfo.user_id, role_id: data.userInfo.role_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION_FOR_REFRESH_TOKEN } // Token expiration time
        );

        const insertTokenRes = await VerifyModel.insertUserToken({
            account_id: data.userInfo.account_id,
            access_token,
            refresh_token,
            device_info: device_info || null,
            ip_address: ip_address || null
        });

        if (insertTokenRes.errorCode !== 0) {
            return res.status(500).json({
                error: 'Failed to insert token.',
                success: false
            });
        }

        // Attach token to cookie and return response
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict' | 'Lax',
            maxAge: 1000 * 60 * 60 // 1 hour
        });

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict' | 'Lax',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days or your preferred duration
        });

        const responseData = {
            "account_id": data.userInfo.account_id,
            "email": data.userInfo.email,
            "mobile": data.userInfo.mobile,
            "role_id": data.userInfo.role_id,
            "status": data.userInfo.status
        };

        return res.status(200).json({
            message: data.message,
            success: data.errorCode === 0,
            user: responseData
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            error: 'Unexpected server error during login.',
            success: false
        });
    }
};

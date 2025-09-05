import Booking from "../../models/public-user/booking.model.js";

export const createBookingController = async (req, res) => {
    const {
        user_id,
        center_id,
        symptoms,
        severity,
        treatment_type,
        preferred_place,
        booking_date,
        booking_time
    } = req.body;

    // Validate required fields
    if (!user_id || !center_id || !symptoms || !severity || !treatment_type || !preferred_place || !booking_date || !booking_time) {
        return res.status(400).json({
            error: 'Missing required fields. Please provide all necessary booking details.',
            success: false
        });
    }

    if (!['MILD', 'MODERATE', 'SEVERE'].includes(severity)) {
        return res.status(400).json({
            error: 'Invalid severity level.',
            success: false
        });
    }

    if (!['BASIC_HYDRATION', 'PAIN_RELIEF', 'IV_THERAPY'].includes(treatment_type)) {
        return res.status(400).json({
            error: 'Invalid treatment type.',
            success: false
        });
    }

    if (!['HOME', 'NURSING_HOME', 'HOSPITAL', 'HOTEL', 'OTHER'].includes(preferred_place)) {
        return res.status(400).json({
            error: 'Invalid preferred place.',
            success: false
        });
    }

    try {
        const bookingResult = await Booking.createBooking({
            user_id,
            center_id,
            symptoms,
            severity,
            treatment_type,
            preferred_place,
            booking_date,
            booking_time
        });

        if (bookingResult.errorCode !== 0) {
            return res.status(500).json({
                error: bookingResult.message,
                success: false
            });
        }

        return res.status(201).json({
            message: 'Booking created successfully',
            success: true,
            booking_id: bookingResult.booking_id
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Failed to create booking',
            success: false
        });
    }
};

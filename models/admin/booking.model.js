export default class Booking {
    static async createBooking({
        user_id,
        center_id,
        symptoms,
        severity,
        treatment_type,
        preferred_place,
        booking_date,
        booking_time
    }) {
        // Call the stored procedure to create a booking
        const [rows] = await pool.query(
            'CALL sp_CreateBooking(?, ?, ?, ?, ?, ?, ?, ?, @o_errorCode, @o_message, @o_booking_id); SELECT @o_errorCode AS errorCode, @o_message AS message, @o_booking_id AS booking_id;',
            [
                user_id,
                center_id,
                symptoms,
                severity,
                treatment_type,
                preferred_place,
                booking_date,
                booking_time
            ]
        );
        // The output parameters are in the second result set
        const output = rows[1][0];
        return {
            errorCode: output.errorCode,
            message: output.message,
            booking_id: output.booking_id
        };
    }
}

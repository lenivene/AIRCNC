const Booking = require('../models/Booking');

module.exports = {
    async store( req, res ){
        const { booking_id } = req.params;

        const booking = await Booking.findById( booking_id ).populate('spot');

        booking.approved = true;

        await booking.save();

        const UserSocket = req.connectedUsers[ booking.user ];

        if( UserSocket ){
            req.io.to( UserSocket ).emit( 'booking_response', booking );
        }

        return res.json( booking );
    }
}
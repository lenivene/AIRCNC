const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const BookingSchema = Schema({
    date : String,
    approved : Boolean,
    user : {
        type : ObjectId,
        ref: 'User'
    },
    spot : {
        type : ObjectId,
        ref: 'Spot'
    }
});

module.exports = model('Booking', BookingSchema);
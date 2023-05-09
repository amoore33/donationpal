const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
    campaign_id: {
        type: mongoose.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.ObjectId
        // required: true
    },
    message: {
        type: String,
        // required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    payment_id: String
});

module.exports = mongoose.model('donations', DonationSchema);
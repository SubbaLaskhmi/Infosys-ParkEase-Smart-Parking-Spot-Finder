const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parkingLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    },
    vehicle: {
        type: String,
        plateNumber: String,
        model: String
    },
    slotNumber: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    duration: {
        hours: Number,
        minutes: Number
    },
    pricing: {
        hourlyRate: Number,
        totalAmount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: '₹'
        }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    qrCode: {
        type: String
    },
    checkIn: {
        time: Date,
        verified: {
            type: Boolean,
            default: false
        }
    },
    checkOut: {
        time: Date,
        verified: {
            type: Boolean,
            default: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
bookingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);

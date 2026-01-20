const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pricing: {
        hourlyRate: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: '₹'
        }
    },
    slots: {
        total: {
            type: Number,
            required: true
        },
        available: {
            type: Number,
            required: true
        },
        occupied: {
            type: Number,
            default: 0
        }
    },
    vehicleTypes: [{
        type: String,
        enum: ['car', 'bike', 'truck', 'lorry']
    }],
    amenities: [{
        type: String
    }],
    evCharging: {
        available: {
            type: Boolean,
            default: false
        },
        stations: [{
            id: String,
            status: {
                type: String,
                enum: ['available', 'charging', 'maintenance'],
                default: 'available'
            },
            vehicleType: String,
            currentVehicle: {
                plateNumber: String,
                timeRemaining: Number
            }
        }]
    },
    status: {
        type: String,
        enum: ['available', 'full', 'closed'],
        default: 'available'
    },
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    operatingHours: {
        open: String,
        close: String,
        is24Hours: {
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
parkingLotSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    // Auto-update status based on available slots
    if (this.slots.available === 0) {
        this.status = 'full';
    } else if (this.slots.available > 0 && this.status === 'full') {
        this.status = 'available';
    }
    next();
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);

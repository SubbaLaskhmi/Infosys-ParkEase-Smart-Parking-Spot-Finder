const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['driver', 'provider', 'admin'],
        default: 'driver'
    },
    profileImage: {
        type: String,
        default: null
    },
    wallet: {
        balance: {
            type: Number,
            default: 0
        },
        transactions: [{
            type: {
                type: String,
                enum: ['credit', 'debit']
            },
            amount: Number,
            description: String,
            date: {
                type: Date,
                default: Date.now
            }
        }]
    },
    vehicles: [{
        type: String,
        plateNumber: String,
        model: String,
        isEV: Boolean
    }],
    savedPlaces: [{
        name: String,
        address: String,
        latitude: Number,
        longitude: Number
    }],
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending'],
        default: 'active'
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
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);

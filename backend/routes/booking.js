const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const ParkingLot = require('../models/ParkingLot');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Create booking
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { parkingLotId, vehicle, slotNumber, startTime, endTime, totalAmount } = req.body;

        // Check if parking lot exists and has available slots
        const parkingLot = await ParkingLot.findById(parkingLotId);
        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        if (parkingLot.slots.available === 0) {
            return res.status(400).json({ error: 'No available slots' });
        }

        // Check user wallet balance
        const user = await User.findById(req.user.userId);
        if (user.wallet.balance < totalAmount) {
            return res.status(400).json({ error: 'Insufficient wallet balance' });
        }

        // Calculate duration
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationMs = end - start;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        // Create booking
        const booking = new Booking({
            user: req.user.userId,
            parkingLot: parkingLotId,
            vehicle,
            slotNumber,
            startTime,
            endTime,
            duration: { hours, minutes },
            pricing: {
                hourlyRate: parkingLot.pricing.hourlyRate,
                totalAmount,
                currency: parkingLot.pricing.currency
            },
            status: 'confirmed',
            paymentStatus: 'paid',
            qrCode: `QR-${Date.now()}-${req.user.userId}`
        });

        await booking.save();

        // Update parking lot slots
        parkingLot.slots.available -= 1;
        parkingLot.slots.occupied += 1;
        await parkingLot.save();

        // Deduct from user wallet
        user.wallet.balance -= totalAmount;
        user.wallet.transactions.push({
            type: 'debit',
            amount: totalAmount,
            description: `Parking booking at ${parkingLot.name}`
        });
        await user.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: await booking.populate(['parkingLot', 'user'])
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking', message: error.message });
    }
});

// Get user bookings
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId })
            .populate('parkingLot')
            .sort({ createdAt: -1 });

        res.json({ bookings, count: bookings.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings', message: error.message });
    }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('parkingLot')
            .populate('user', 'name email phone');

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json({ booking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking', message: error.message });
    }
});

// Update booking status
router.patch('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.status = status;

        // If cancelled, refund and update parking lot
        if (status === 'cancelled') {
            const user = await User.findById(booking.user);
            const parkingLot = await ParkingLot.findById(booking.parkingLot);

            // Refund to wallet
            user.wallet.balance += booking.pricing.totalAmount;
            user.wallet.transactions.push({
                type: 'credit',
                amount: booking.pricing.totalAmount,
                description: `Refund for cancelled booking`
            });
            await user.save();

            // Update parking lot slots
            parkingLot.slots.available += 1;
            parkingLot.slots.occupied -= 1;
            await parkingLot.save();

            booking.paymentStatus = 'refunded';
        }

        await booking.save();
        res.json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking', message: error.message });
    }
});

// Check-in
router.post('/:id/checkin', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.checkIn = {
            time: new Date(),
            verified: true
        };
        booking.status = 'active';

        await booking.save();
        res.json({ message: 'Check-in successful', booking });
    } catch (error) {
        res.status(500).json({ error: 'Check-in failed', message: error.message });
    }
});

// Check-out
router.post('/:id/checkout', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.checkOut = {
            time: new Date(),
            verified: true
        };
        booking.status = 'completed';

        await booking.save();

        // Update parking lot slots
        const parkingLot = await ParkingLot.findById(booking.parkingLot);
        parkingLot.slots.available += 1;
        parkingLot.slots.occupied -= 1;
        await parkingLot.save();

        res.json({ message: 'Check-out successful', booking });
    } catch (error) {
        res.status(500).json({ error: 'Check-out failed', message: error.message });
    }
});

module.exports = router;

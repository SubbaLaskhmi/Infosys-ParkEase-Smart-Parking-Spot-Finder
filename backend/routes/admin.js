const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ParkingLot = require('../models/ParkingLot');
const Booking = require('../models/Booking');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all users (Admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { role, status } = req.query;

        let query = {};
        if (role) query.role = role;
        if (status) query.status = status;

        const users = await User.find(query).select('-password');
        res.json({ users, count: users.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', message: error.message });
    }
});

// Get all drivers
router.get('/drivers', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const drivers = await User.find({ role: 'driver' }).select('-password');
        res.json({ drivers, count: drivers.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch drivers', message: error.message });
    }
});

// Get all providers
router.get('/providers', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const providers = await User.find({ role: 'provider' }).select('-password');

        // Get parking lots count for each provider
        const providersWithStats = await Promise.all(
            providers.map(async (provider) => {
                const lots = await ParkingLot.find({ provider: provider._id });
                const totalEVStations = lots.reduce((sum, lot) =>
                    sum + (lot.evCharging.stations?.length || 0), 0
                );

                return {
                    ...provider.toObject(),
                    lotsCount: lots.length,
                    evStationsCount: totalEVStations
                };
            })
        );

        res.json({ providers: providersWithStats, count: providersWithStats.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch providers', message: error.message });
    }
});

// Get user details by ID
router.get('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get additional stats based on role
        let additionalData = {};

        if (user.role === 'driver') {
            const bookings = await Booking.find({ user: user._id }).populate('parkingLot');
            additionalData.bookings = bookings;
            additionalData.totalBookings = bookings.length;
        } else if (user.role === 'provider') {
            const parkingLots = await ParkingLot.find({ provider: user._id });
            additionalData.parkingLots = parkingLots;
            additionalData.totalLots = parkingLots.length;
        }

        res.json({ user, ...additionalData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details', message: error.message });
    }
});

// Suspend user
router.patch('/users/:id/suspend', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.status = 'suspended';
        await user.save();

        res.json({ message: 'User suspended successfully', user: await User.findById(user._id).select('-password') });
    } catch (error) {
        res.status(500).json({ error: 'Failed to suspend user', message: error.message });
    }
});

// Activate user
router.patch('/users/:id/activate', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.status = 'active';
        await user.save();

        res.json({ message: 'User activated successfully', user: await User.findById(user._id).select('-password') });
    } catch (error) {
        res.status(500).json({ error: 'Failed to activate user', message: error.message });
    }
});

// Delete user
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If provider, delete their parking lots
        if (user.role === 'provider') {
            await ParkingLot.deleteMany({ provider: user._id });
        }

        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', message: error.message });
    }
});

// Get dashboard statistics
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDrivers = await User.countDocuments({ role: 'driver' });
        const totalProviders = await User.countDocuments({ role: 'provider' });
        const totalParkingLots = await ParkingLot.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeBookings = await Booking.countDocuments({ status: 'active' });

        res.json({
            totalUsers,
            totalDrivers,
            totalProviders,
            totalParkingLots,
            totalBookings,
            activeBookings
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics', message: error.message });
    }
});

module.exports = router;

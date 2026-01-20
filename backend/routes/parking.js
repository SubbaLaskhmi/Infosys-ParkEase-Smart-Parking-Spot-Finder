const express = require('express');
const router = express.Router();
const ParkingLot = require('../models/ParkingLot');
const { authenticateToken } = require('../middleware/auth');

// Get all parking lots
router.get('/', async (req, res) => {
    try {
        const { latitude, longitude, radius, status } = req.query;

        let query = {};

        // Filter by status if provided
        if (status) {
            query.status = status;
        }

        let parkingLots = await ParkingLot.find(query).populate('provider', 'name email phone');

        // Filter by location if coordinates provided
        if (latitude && longitude) {
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            const rad = parseFloat(radius) || 5; // Default 5km radius

            parkingLots = parkingLots.filter(lot => {
                const distance = calculateDistance(lat, lon, lot.location.latitude, lot.location.longitude);
                return distance <= rad;
            });
        }

        res.json({ parkingLots, count: parkingLots.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch parking lots', message: error.message });
    }
});

// Get parking lot by ID
router.get('/:id', async (req, res) => {
    try {
        const parkingLot = await ParkingLot.findById(req.params.id).populate('provider', 'name email phone');

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        res.json({ parkingLot });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch parking lot', message: error.message });
    }
});

// Create parking lot (Provider only)
router.post('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: 'Only providers can create parking lots' });
        }

        const parkingLot = new ParkingLot({
            ...req.body,
            provider: req.user.userId
        });

        await parkingLot.save();
        res.status(201).json({ message: 'Parking lot created successfully', parkingLot });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create parking lot', message: error.message });
    }
});

// Update parking lot
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const parkingLot = await ParkingLot.findById(req.params.id);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        // Check if user is the provider or admin
        if (req.user.role !== 'admin' && parkingLot.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to update this parking lot' });
        }

        Object.assign(parkingLot, req.body);
        await parkingLot.save();

        res.json({ message: 'Parking lot updated successfully', parkingLot });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update parking lot', message: error.message });
    }
});

// Delete parking lot
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const parkingLot = await ParkingLot.findById(req.params.id);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        // Check if user is the provider or admin
        if (req.user.role !== 'admin' && parkingLot.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this parking lot' });
        }

        await parkingLot.deleteOne();
        res.json({ message: 'Parking lot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete parking lot', message: error.message });
    }
});

// Get parking lots by provider
router.get('/provider/:providerId', async (req, res) => {
    try {
        const parkingLots = await ParkingLot.find({ provider: req.params.providerId });
        res.json({ parkingLots, count: parkingLots.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch provider parking lots', message: error.message });
    }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = router;

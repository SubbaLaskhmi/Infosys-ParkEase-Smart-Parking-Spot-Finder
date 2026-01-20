const express = require('express');
const router = express.Router();
const ParkingLot = require('../models/ParkingLot');
const { authenticateToken } = require('../middleware/auth');

// Get all EV charging stations
router.get('/stations', async (req, res) => {
    try {
        const parkingLots = await ParkingLot.find({ 'evCharging.available': true })
            .populate('provider', 'name email phone');

        const evStations = parkingLots.map(lot => ({
            parkingLotId: lot._id,
            parkingLotName: lot.name,
            address: lot.address,
            location: lot.location,
            provider: lot.provider,
            stations: lot.evCharging.stations
        }));

        res.json({ evStations, count: evStations.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch EV stations', message: error.message });
    }
});

// Get EV stations by parking lot
router.get('/stations/:parkingLotId', async (req, res) => {
    try {
        const parkingLot = await ParkingLot.findById(req.params.parkingLotId);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        if (!parkingLot.evCharging.available) {
            return res.status(404).json({ error: 'No EV charging available at this location' });
        }

        res.json({
            parkingLotName: parkingLot.name,
            stations: parkingLot.evCharging.stations
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch EV stations', message: error.message });
    }
});

// Add EV charging station (Provider only)
router.post('/stations/:parkingLotId', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: 'Only providers can add EV stations' });
        }

        const parkingLot = await ParkingLot.findById(req.params.parkingLotId);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        if (parkingLot.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to modify this parking lot' });
        }

        const { id, vehicleType } = req.body;

        parkingLot.evCharging.available = true;
        parkingLot.evCharging.stations.push({
            id,
            status: 'available',
            vehicleType
        });

        await parkingLot.save();

        res.status(201).json({
            message: 'EV station added successfully',
            stations: parkingLot.evCharging.stations
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add EV station', message: error.message });
    }
});

// Update EV station status
router.patch('/stations/:parkingLotId/:stationId', authenticateToken, async (req, res) => {
    try {
        const { status, currentVehicle } = req.body;

        const parkingLot = await ParkingLot.findById(req.params.parkingLotId);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        const station = parkingLot.evCharging.stations.find(
            s => s.id === req.params.stationId
        );

        if (!station) {
            return res.status(404).json({ error: 'EV station not found' });
        }

        if (status) station.status = status;
        if (currentVehicle) station.currentVehicle = currentVehicle;

        await parkingLot.save();

        res.json({ message: 'EV station updated successfully', station });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update EV station', message: error.message });
    }
});

// Delete EV station
router.delete('/stations/:parkingLotId/:stationId', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'provider') {
            return res.status(403).json({ error: 'Only providers can delete EV stations' });
        }

        const parkingLot = await ParkingLot.findById(req.params.parkingLotId);

        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        if (parkingLot.provider.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to modify this parking lot' });
        }

        parkingLot.evCharging.stations = parkingLot.evCharging.stations.filter(
            s => s.id !== req.params.stationId
        );

        if (parkingLot.evCharging.stations.length === 0) {
            parkingLot.evCharging.available = false;
        }

        await parkingLot.save();

        res.json({ message: 'EV station deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete EV station', message: error.message });
    }
});

module.exports = router;

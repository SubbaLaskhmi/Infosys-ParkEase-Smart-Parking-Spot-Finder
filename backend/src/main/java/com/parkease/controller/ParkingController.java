package com.parkease.controller;

import com.parkease.model.ParkingListing;
import com.parkease.service.ParkingService;
import com.parkease.service.AIService;
import com.parkease.service.PricingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parkings")
public class ParkingController {
    @Autowired
    ParkingService parkingService;

    @Autowired
    AIService aiService;

    @Autowired
    PricingService pricingService;

    @GetMapping
    public ResponseEntity<List<ParkingListing>> getAllApprovedParkings() {
        return ResponseEntity.ok(parkingService.getApprovedListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getParkingById(@PathVariable String id) {
        ParkingListing listing = parkingService.getListingById(id);
        if (listing != null && listing.getStatus().name().equals("APPROVED")) {
            return ResponseEntity.ok(listing);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/predict")
    public ResponseEntity<?> getPrediction(@PathVariable String id) {
        return ResponseEntity.ok(java.util.Map.of(
                "prediction", aiService.predictAvailability(id),
                "matchScore", aiService.calculateMatchScore("Parking") // generic title for now
        ));
    }

    @GetMapping("/{id}/price")
    public ResponseEntity<?> getDynamicPrice(@PathVariable String id) {
        // Mock occupancy for demo: 85% full
        double multiplier = pricingService.getSurgeMultiplier(85, 100);
        return ResponseEntity.ok(java.util.Map.of(
                "baseRate", 50, // mock base rate
                "multiplier", multiplier,
                "finalRate", 50 * multiplier));
    }
}

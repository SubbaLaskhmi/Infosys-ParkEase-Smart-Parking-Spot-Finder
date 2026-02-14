package com.parkease.controller;

// Trigger IDE re-index
import com.parkease.model.ParkingListing;
import com.parkease.security.UserDetailsImpl;
import com.parkease.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/provider")
// @PreAuthorize("hasAuthority('ROLE_PROVIDER') or hasAuthority('ROLE_ADMIN')")
public class ProviderController {
    @Autowired
    ParkingService parkingService;

    @PostMapping("/listings")
    public ResponseEntity<?> createListing(@RequestBody ParkingListing listing,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Programmatic security check for PROVIDER or ADMIN roles
        boolean isProvider = userDetails.getAuthorities().stream()
                .anyMatch(a -> {
                    String auth = a.getAuthority().toUpperCase();
                    return auth.contains("PROVIDER") || auth.contains("ADMIN");
                });

        if (!isProvider) {
            return ResponseEntity.status(403)
                    .body(Map.of(
                            "success", false,
                            "message", "Access denied. Only providers and admins can create parking listings."));
        }

        try {
            UserDetailsImpl user = (UserDetailsImpl) userDetails;
            ParkingListing created = parkingService.createListing(listing, user.getId());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Parking listing created successfully",
                    "data", created));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error: " + e.getMessage()));
        }
    }

    @GetMapping("/listings")
    public ResponseEntity<List<ParkingListing>> getMyListings(@AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(parkingService.getMyListings(user.getId()));
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<?> getListingById(@PathVariable String id) {
        ParkingListing listing = parkingService.getListingById(id);
        if (listing == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(listing);
    }

    @PutMapping("/listings/{id}")
    public ResponseEntity<?> updateListing(@PathVariable String id, @RequestBody ParkingListing listing) {
        try {
            ParkingListing updated = parkingService.updateListing(id, listing);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Parking listing updated successfully",
                    "data", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/listings/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable String id) {
        parkingService.deleteListing(id);
        return ResponseEntity.ok("Deleted");
    }

    @Autowired
    com.parkease.service.BookingService bookingService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats(@AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(bookingService.getProviderDashboardStats(user.getId()));
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getProviderBookings(@AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(bookingService.getProviderBookings(user.getId()));
    }

    // Note: Scan functionality is related to Bookings, so we might put it in
    // BookingController
    // or here if it is provider-centric.
}

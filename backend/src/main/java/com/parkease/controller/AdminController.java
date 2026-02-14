package com.parkease.controller;

import com.parkease.repository.UserRepository;
import com.parkease.security.UserDetailsImpl;
import com.parkease.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    ParkingService parkingService;

    @Autowired
    UserRepository userRepository; // Direct repo for simple user management

    @GetMapping("/parkings/pending")
    public ResponseEntity<?> getAllListings() {
        // In real app, might want filter. For now returning all so admin can see
        // PENDING
        return ResponseEntity.ok(parkingService.getAllListings());
    }

    @PutMapping("/parkings/{id}/approve")
    public ResponseEntity<?> approveListing(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl admin = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(parkingService.approveListing(id, admin.getId()));
    }

    @PutMapping("/parkings/{id}/reject")
    public ResponseEntity<?> rejectListing(@PathVariable String id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(parkingService.rejectListing(id, body.get("reason")));
    }

    @Autowired
    com.parkease.repository.BookingRepository bookingRepository; // Inject BookingRepository for stats

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats() {
        long totalUsers = userRepository.count();
        long totalProviders = userRepository.findAll().stream().filter(u -> u.getRole().name().equals("PROVIDER"))
                .count();
        long totalBookings = bookingRepository.count();
        long activeSpots = parkingService.getApprovedListings().size();

        // Calculate total revenue (sum of all bookings)
        double totalRevenue = bookingRepository.findAll().stream()
                .mapToDouble(com.parkease.model.Booking::getTotalAmount)
                .sum();

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalProviders", totalProviders,
                "totalBookings", totalBookings,
                "activeSpots", activeSpots,
                "totalRevenue", totalRevenue));
    }

    @GetMapping("/revenue-stats")
    public ResponseEntity<?> getRevenueStats() {
        // Mock data for chart - in real app, aggregate Booking data by month
        java.util.List<Map<String, Object>> data = java.util.List.of(
                Map.of("name", "Jan", "users", 120, "revenue", 5000),
                Map.of("name", "Feb", "users", 200, "revenue", 8500),
                Map.of("name", "Mar", "users", 350, "revenue", 12000),
                Map.of("name", "Apr", "users", 500, "revenue", 18500),
                Map.of("name", "May", "users", 750, "revenue", 25000),
                Map.of("name", "Jun", "users", 1100, "revenue", 38000));
        return ResponseEntity.ok(data);
    }

    @Autowired
    org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        com.parkease.model.User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("password")) {
            user.setPassword(passwordEncoder.encode((String) updates.get("password")));
        }
        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
        }
        // ... add other fields if needed

        return ResponseEntity.ok(userRepository.save(user));
    }
}

package com.parkease.controller;

import com.parkease.dto.BookingRequest;
import com.parkease.model.BookingStatus;
import com.parkease.security.UserDetailsImpl;
import com.parkease.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        try {
            return ResponseEntity.ok(bookingService.createBooking(request, user.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/my")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> getMyBookings(@AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(bookingService.getMyBookings(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    // Provider Scan API
    @PostMapping("/scan")
    @PreAuthorize("hasAuthority('ROLE_PROVIDER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> scanBooking(@RequestBody Map<String, String> body) {
        String bookingId = body.get("bookingId");
        try {
            return ResponseEntity.ok(bookingService.scanBooking(bookingId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid Booking ID"));
        }
    }

    @GetMapping("/provider")
    @PreAuthorize("hasAuthority('ROLE_PROVIDER')")
    public ResponseEntity<?> getProviderBookings(@AuthenticationPrincipal UserDetails userDetails) {
        UserDetailsImpl user = (UserDetailsImpl) userDetails;
        return ResponseEntity.ok(bookingService.getProviderBookings(user.getId()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_PROVIDER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        BookingStatus status = BookingStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(bookingService.updateStatus(id, status));
    }
}

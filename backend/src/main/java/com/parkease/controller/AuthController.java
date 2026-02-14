package com.parkease.controller;

import com.parkease.dto.GoogleLoginRequest;
import com.parkease.dto.LoginRequest;
import com.parkease.dto.SignupRequest;
import com.parkease.model.User;
import com.parkease.service.AuthService;
import com.parkease.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            return ResponseEntity.ok(authService.registerUser(signUpRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest googleRequest) {
        return ResponseEntity.ok(authService.googleLogin(googleRequest));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        try {
            authService.forgotPassword(payload.get("email"));
            return ResponseEntity.ok(Map.of("message", "Reset token generated (check console)"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody Map<String, String> payload) {
        try {
            authService.resetPassword(token, payload.get("password"));
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        // Logic to return current user details
        // Note: userDetails contains id, username etc. We might want full user object.
        // UserDetailsImpl has logic to return ID.
        // But for cleaner approach, let's fetch fresh from DB
        try {
            com.parkease.security.UserDetailsImpl userImpl = (com.parkease.security.UserDetailsImpl) userDetails;
            User user = userService.getUserById(userImpl.getId());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody User userUpdates) {
        com.parkease.security.UserDetailsImpl userImpl = (com.parkease.security.UserDetailsImpl) userDetails;
        return ResponseEntity.ok(userService.updateProfile(userImpl.getId(), userUpdates));
    }

    @PutMapping("/favorite/{id}")
    public ResponseEntity<?> toggleFavorite(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String id) {
        com.parkease.security.UserDetailsImpl userImpl = (com.parkease.security.UserDetailsImpl) userDetails;
        return ResponseEntity.ok(userService.toggleFavorite(userImpl.getId(), id));
    }

    @PostMapping("/wallet/add")
    public ResponseEntity<?> addFunds(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Double> payload) {
        com.parkease.security.UserDetailsImpl userImpl = (com.parkease.security.UserDetailsImpl) userDetails;
        Double amount = payload.get("amount");
        if (amount == null || amount <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid amount"));
        }
        return ResponseEntity.ok(userService.addFunds(userImpl.getId(), amount));
    }

    @PostMapping("/wallet/withdraw")
    public ResponseEntity<?> withdrawFunds(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Double> payload) {
        com.parkease.security.UserDetailsImpl userImpl = (com.parkease.security.UserDetailsImpl) userDetails;
        Double amount = payload.get("amount");
        if (amount == null || amount <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid amount"));
        }
        try {
            return ResponseEntity.ok(userService.withdrawFunds(userImpl.getId(), amount));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}

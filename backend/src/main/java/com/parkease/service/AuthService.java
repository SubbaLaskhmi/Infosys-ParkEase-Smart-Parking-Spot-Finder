package com.parkease.service;

import com.parkease.dto.GoogleLoginRequest;
import com.parkease.dto.JwtResponse;
import com.parkease.dto.LoginRequest;
import com.parkease.dto.SignupRequest;
import com.parkease.model.Role;
import com.parkease.model.User;
import com.parkease.repository.UserRepository;
import com.parkease.security.JwtUtils;
import com.parkease.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(), // In our impl, username IS email, but let's fetch name from DB if needed
                userDetails.getEmail(),
                userDetails.getRole());
    }

    public JwtResponse registerUser(SignupRequest signUpRequest) throws Exception {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new Exception("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());

        userRepository.save(user);

        // Auto-login logic
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRole());
    }

    public JwtResponse googleLogin(GoogleLoginRequest googleRequest) {
        // Check if user exists
        User user = userRepository.findByEmail(googleRequest.getEmail()).orElse(null);

        if (user == null) {
            // Register new user
            user = new User();
            user.setName(googleRequest.getName());
            user.setEmail(googleRequest.getEmail());
            user.setGoogleId(googleRequest.getGoogleId());
            user.setPhoto(googleRequest.getPhoto());
            user.setRole(Role.USER); // Default to USER for Google Login
            // No password for google users
            userRepository.save(user);
        } else if (user.getGoogleId() == null) {
            // Merge google ID if email exists but wasn't a google account
            user.setGoogleId(googleRequest.getGoogleId());
            userRepository.save(user);
        }

        // Generate Token
        String jwt = jwtUtils.generateJwtToken(user);

        return new JwtResponse(jwt,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name());
    }

    public void forgotPassword(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        // Generate simple token
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordExpire(new Date(System.currentTimeMillis() + 3600000)); // 1 hour
        userRepository.save(user);

        // Simulating email sending logic here

    }

    public void resetPassword(String token, String newPassword) throws Exception {
        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new Exception("Invalid token"));

        if (user.getResetPasswordExpire().before(new Date())) {
            throw new Exception("Token expired");
        }

        user.setPassword(encoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpire(null);
        userRepository.save(user);
    }
}

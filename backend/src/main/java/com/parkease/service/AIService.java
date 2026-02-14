package com.parkease.service;

import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.Random;

@Service
public class AIService {

    private final Random random = new Random();

    // Simulate availability prediction based on time of day
    public String predictAvailability(String parkingId) {
        LocalTime now = LocalTime.now();
        int hour = now.getHour();

        // Rush hours: 9AM - 11AM and 5PM - 8PM
        boolean isRushHour = (hour >= 9 && hour <= 11) || (hour >= 17 && hour <= 20);

        if (isRushHour) {
            // 70% chance of being full in rush hour
            return random.nextInt(10) > 3 ? "High Demand (Low Availability)" : "Medium Availability";
        } else {
            // 80% chance of being available off-peak
            return random.nextInt(10) > 2 ? "High Availability" : "Medium Demand";
        }
    }

    // Simulate "Smart Match" score (0-100)
    public int calculateMatchScore(String parkingTitle) {
        // Mock logic: prefer Mall/Metro locations
        if (parkingTitle.toLowerCase().contains("mall") || parkingTitle.toLowerCase().contains("metro")) {
            return 90 + random.nextInt(10);
        }
        return 70 + random.nextInt(20);
    }
}

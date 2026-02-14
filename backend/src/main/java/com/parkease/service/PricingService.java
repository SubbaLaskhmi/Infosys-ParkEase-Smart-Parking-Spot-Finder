package com.parkease.service;

import org.springframework.stereotype.Service;

@Service
public class PricingService {

    // Calculate dynamic price based on base rate and demand factor
    public double calculateDynamicPrice(double baseRate, boolean isHighDemand) {
        if (isHighDemand) {
            // 1.5x surge pricing during high demand
            return baseRate * 1.5;
        }
        return baseRate;
    }

    public double getSurgeMultiplier(int currentOccupancy, int totalSlots) {
        if (totalSlots == 0)
            return 1.0;

        double occupancyRate = (double) currentOccupancy / totalSlots;

        if (occupancyRate > 0.9)
            return 2.0; // 2x if 90% full
        if (occupancyRate > 0.7)
            return 1.5; // 1.5x if 70% full
        return 1.0; // Standard rate
    }
}

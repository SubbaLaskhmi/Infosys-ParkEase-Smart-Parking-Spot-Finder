package com.parkease.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "ParkEase Backend is Running!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}

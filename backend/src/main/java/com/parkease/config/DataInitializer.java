package com.parkease.config;

import com.parkease.model.Role;
import com.parkease.model.User;
import com.parkease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.parkease.repository.ParkingListingRepository parkingListingRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin exists
        User admin;
        if (!userRepository.existsByEmail("admin@parkease.com")) {
            admin = new User();
            admin.setName("Super Admin");
            admin.setEmail("admin@parkease.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // Default password
            admin.setRole(Role.ADMIN);
            admin.setPhone("0000000000");

            admin = userRepository.save(admin);
            System.out.println("✅ Default Admin User Created: admin@parkease.com / admin123");
        } else {
            // Optional: Ensure the existing admin has the correct role
            admin = userRepository.findByEmail("admin@parkease.com").orElse(null);
            if (admin != null) {
                boolean changed = false;
                if (admin.getRole() != Role.ADMIN) {
                    admin.setRole(Role.ADMIN);
                    changed = true;
                }
                // Force reset password to ensure we can login
                // admin.setPassword(passwordEncoder.encode("admin123"));
                // changed = true;

                if (changed) {
                    admin = userRepository.save(admin);
                    System.out.println("✅ Updated existing admin@parkease.com role/password");
                }
            }
        }

        // Check if a provider exists for testing
        User owner;
        if (!userRepository.existsByEmail("owner@parkease.com")) {
            owner = new User();
            owner.setName("Demo Space Owner");
            owner.setEmail("owner@parkease.com");
            owner.setPassword(passwordEncoder.encode("owner123"));
            owner.setRole(Role.PROVIDER);
            owner.setPhone("1111111111");

            owner = userRepository.save(owner);
            System.out.println("✅ Default Owner User Created: owner@parkease.com / owner123");
        } else {
            owner = userRepository.findByEmail("owner@parkease.com").orElse(null);
            if (owner != null) {
                boolean changed = false;
                if (owner.getRole() != Role.PROVIDER) {
                    owner.setRole(Role.PROVIDER);
                    changed = true;
                }
                // Force reset password
                // owner.setPassword(passwordEncoder.encode("owner123"));
                // changed = true;

                if (changed) {
                    owner = userRepository.save(owner);
                    System.out.println("✅ Updated existing owner@parkease.com role/password");
                }
            }
        }

        // Check if a driver/user exists for testing
        if (!userRepository.existsByEmail("user@parkease.com")) {
            User user = new User();
            user.setName("Demo Driver");
            user.setEmail("user@parkease.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(Role.USER);
            user.setPhone("2222222222");
            user.setWalletBalance(50.0);

            userRepository.save(user);
            System.out.println("✅ Default Driver User Created: user@parkease.com / user123");
        }

        // Seed Parking Listings
        // Seed Parking Listings
        if (owner != null && admin != null) {
            System.out.println("Checking/Seeding parking listings...");
            seedParkingListings(owner, admin);
        }
    }

    private void seedParkingListings(User owner, User admin) {
        java.util.List<com.parkease.model.ParkingListing> listings = new java.util.ArrayList<>();

        // 1. MG Road Premium Parking
        com.parkease.model.ParkingListing l1 = new com.parkease.model.ParkingListing();
        l1.setTitle("MG Road Premium Parking");
        l1.setDescription("Secure basement parking near Metro Station.");
        l1.setAddressLine("Rex Towers, MG Road");
        l1.setCity("Bangalore");
        l1.setPincode("560001");
        l1.setLocation(new com.parkease.model.ParkingListing.Location(12.9716, 77.5946));

        com.parkease.model.ParkingListing.Pricing p1 = new com.parkease.model.ParkingListing.Pricing();
        p1.setHourlyRate(50);
        l1.setPricing(p1);

        l1.setAvailableFrom("08:00");
        l1.setAvailableTo("22:00");
        l1.setOwnershipRelation(com.parkease.model.OwnershipRelation.SELF);

        com.parkease.model.ParkingListing.Dimensions d1 = new com.parkease.model.ParkingListing.Dimensions();
        d1.setLength(20);
        d1.setWidth(30);
        d1.setTotalArea(600);
        l1.setDimensions(d1);

        l1.setApproxTotalCars(40);

        com.parkease.model.ParkingListing.VehicleCapacity vc1 = new com.parkease.model.ParkingListing.VehicleCapacity();
        vc1.setCar4Seater(30);
        vc1.setTwoWheeler(20);
        l1.setVehicleCapacity(vc1);

        l1.setImages(java.util.Arrays.asList(
                "https://images.unsplash.com/photo-1470224114654-ee47329603f7?auto=format&fit=crop&q=80&w=1000"));
        l1.setStatus(com.parkease.model.ListingStatus.APPROVED);
        l1.setProviderId(owner);
        l1.setApprovedBy(admin);
        l1.setApprovedAt(new java.util.Date());
        listings.add(l1);

        // 2. Indiranagar High Street
        com.parkease.model.ParkingListing l2 = new com.parkease.model.ParkingListing();
        l2.setTitle("Indiranagar High Street");
        l2.setDescription("Open lot parking behind 12th Main heavy shopping area.");
        l2.setAddressLine("12th Main, Indiranagar");
        l2.setCity("Bangalore");
        l2.setPincode("560038");
        l2.setLocation(new com.parkease.model.ParkingListing.Location(12.9719, 77.6412));

        com.parkease.model.ParkingListing.Pricing p2 = new com.parkease.model.ParkingListing.Pricing();
        p2.setHourlyRate(80);
        l2.setPricing(p2);

        l2.setAvailableFrom("10:00");
        l2.setAvailableTo("23:00");
        l2.setOwnershipRelation(com.parkease.model.OwnershipRelation.SELF);

        com.parkease.model.ParkingListing.Dimensions d2 = new com.parkease.model.ParkingListing.Dimensions();
        d2.setLength(15);
        d2.setWidth(20);
        d2.setTotalArea(300);
        l2.setDimensions(d2);

        l2.setApproxTotalCars(20);

        com.parkease.model.ParkingListing.VehicleCapacity vc2 = new com.parkease.model.ParkingListing.VehicleCapacity();
        vc2.setCar4Seater(15);
        vc2.setSuv(5);
        l2.setVehicleCapacity(vc2);

        l2.setImages(java.util.Arrays.asList(
                "https://images.unsplash.com/photo-1506521781263-d586e9781085?auto=format&fit=crop&q=80&w=1000"));
        l2.setStatus(com.parkease.model.ListingStatus.APPROVED);
        l2.setProviderId(owner);
        l2.setApprovedBy(admin);
        l2.setApprovedAt(new java.util.Date());
        listings.add(l2);

        // 3. Koramangala Tech Park
        com.parkease.model.ParkingListing l3 = new com.parkease.model.ParkingListing();
        l3.setTitle("Koramangala Tech Park");
        l3.setDescription("Covered parking with EV charging stations.");
        l3.setAddressLine("80 Feet Road, Koramangala");
        l3.setCity("Bangalore");
        l3.setPincode("560095");
        l3.setLocation(new com.parkease.model.ParkingListing.Location(12.9352, 77.6245));

        com.parkease.model.ParkingListing.Pricing p3 = new com.parkease.model.ParkingListing.Pricing();
        p3.setHourlyRate(40);
        l3.setPricing(p3);

        l3.setAvailableFrom("00:00");
        l3.setAvailableTo("23:59");
        l3.setOwnershipRelation(com.parkease.model.OwnershipRelation.SELF);

        com.parkease.model.ParkingListing.Dimensions d3 = new com.parkease.model.ParkingListing.Dimensions();
        d3.setLength(50);
        d3.setWidth(50);
        d3.setTotalArea(2500);
        l3.setDimensions(d3);

        l3.setApproxTotalCars(150);

        com.parkease.model.ParkingListing.VehicleCapacity vc3 = new com.parkease.model.ParkingListing.VehicleCapacity();
        vc3.setCar4Seater(100);
        vc3.setTwoWheeler(50);
        l3.setVehicleCapacity(vc3);

        l3.setImages(java.util.Arrays.asList(
                "https://images.unsplash.com/photo-1590674899505-1c5c41951f89?auto=format&fit=crop&q=80&w=1000"));
        l3.setStatus(com.parkease.model.ListingStatus.APPROVED);
        l3.setProviderId(owner);
        l3.setApprovedBy(admin);
        l3.setApprovedAt(new java.util.Date());
        listings.add(l3);

        for (com.parkease.model.ParkingListing listing : listings) {
            if (!parkingListingRepository.existsByTitle(listing.getTitle())) {
                parkingListingRepository.save(listing);
                System.out.println("✅ Added Seeding: " + listing.getTitle());
            }
        }
    }
}

package com.parkease.service;

import com.parkease.model.ListingStatus;
import com.parkease.model.ParkingListing;
import com.parkease.model.User;
import com.parkease.repository.ParkingListingRepository;
import com.parkease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ParkingService {
    @Autowired
    ParkingListingRepository parkingListingRepository;

    @Autowired
    UserRepository userRepository;

    public ParkingListing createListing(ParkingListing listing, String providerId) {
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        listing.setProviderId(provider);
        listing.setStatus(ListingStatus.PENDING);

        // Auto Calculate Dimensions if needed
        // listing.getDimensions().setTotalArea(...)

        return parkingListingRepository.save(listing);
    }

    public List<ParkingListing> getAllListings() {
        return parkingListingRepository.findAll();
    }

    public List<ParkingListing> getApprovedListings() {
        return parkingListingRepository.findByStatus(ListingStatus.APPROVED);
    }

    public List<ParkingListing> getMyListings(String providerId) {
        return parkingListingRepository.findByProviderIdId(providerId);
    }

    public ParkingListing getListingById(String id) {
        return parkingListingRepository.findById(id).orElse(null);
    }

    public void deleteListing(String id) {
        parkingListingRepository.deleteById(id);
    }

    public ParkingListing updateListing(String id, ParkingListing updatedData) {
        ParkingListing existing = getListingById(id);
        if (existing == null)
            throw new RuntimeException("Listing not found");

        existing.setTitle(updatedData.getTitle());
        existing.setDescription(updatedData.getDescription());
        existing.setAddressLine(updatedData.getAddressLine());
        existing.setCity(updatedData.getCity());
        existing.setLocation(updatedData.getLocation());
        existing.setPricing(updatedData.getPricing());
        existing.setAvailableFrom(updatedData.getAvailableFrom());
        existing.setAvailableTo(updatedData.getAvailableTo());
        existing.setDimensions(updatedData.getDimensions());
        existing.setImages(updatedData.getImages());
        existing.setOwnershipRelation(updatedData.getOwnershipRelation());

        // Reset status to pending after edit? Usually yes for re-approval
        existing.setStatus(ListingStatus.PENDING);

        return parkingListingRepository.save(existing);
    }

    // Admin Actions
    public ParkingListing approveListing(String id, String adminId) {
        ParkingListing listing = getListingById(id);
        if (listing == null)
            throw new RuntimeException("Listing not found");

        User admin = userRepository.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));

        listing.setStatus(ListingStatus.APPROVED);
        listing.setApprovedBy(admin);
        listing.setApprovedAt(new Date());

        return parkingListingRepository.save(listing);
    }

    public ParkingListing rejectListing(String id, String reason) {
        ParkingListing listing = getListingById(id);
        if (listing == null)
            throw new RuntimeException("Listing not found");

        listing.setStatus(ListingStatus.REJECTED);
        listing.setRejectionReason(reason);

        return parkingListingRepository.save(listing);
    }
}

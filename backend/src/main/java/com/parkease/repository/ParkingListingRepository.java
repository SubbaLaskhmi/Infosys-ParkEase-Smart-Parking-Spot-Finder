package com.parkease.repository;

import com.parkease.model.ListingStatus;
import com.parkease.model.ParkingListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingListingRepository extends JpaRepository<ParkingListing, String> {
    List<ParkingListing> findByStatus(ListingStatus status);

    List<ParkingListing> findByProviderIdId(String providerId);

    boolean existsByTitle(String title);
}

package com.parkease.repository;

import com.parkease.model.Booking;
import com.parkease.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    Optional<Booking> findByBookingId(String bookingId);

    @org.springframework.data.jpa.repository.Query("SELECT b FROM Booking b WHERE b.userId.id = ?1")
    List<Booking> findByUserId(String userId);

    List<Booking> findByUserIdId(String userId);

    List<Booking> findByParkingIdId(String parkingId);

    List<Booking> findByStatus(BookingStatus status);

    // Find bookings for a parking space that overlap with a given time range
    // Overlap condition: (StartA <= EndB) and (EndA >= StartB)
    // Here we want to find if any existing booking overlaps with new booking
    // request dates
    // Specifically: existing.startTime < newEndTime AND existing.endTime >
    // newStartTime
    // And status IS NOT CANCELLED OR EXPIRED
    List<Booking> findByParkingIdIdAndStartTimeLessThanAndEndTimeGreaterThanAndStatusNot(
            String parkingId, Date endTime, Date startTime, BookingStatus status);

    List<Booking> findByStatusAndEndTimeBefore(BookingStatus status, Date date);

    // Find bookings for a list of parkings
    List<Booking> findByParkingIdIn(List<com.parkease.model.ParkingListing> parkings);
}

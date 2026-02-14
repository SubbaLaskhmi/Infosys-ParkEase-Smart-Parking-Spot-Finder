package com.parkease.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String bookingId; // Human readable or short ID

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "parking_id")
    private ParkingListing parkingId;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    private double totalHours;
    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.BOOKED;

    @Column(length = 1000)
    private String qrCodeDataUrl;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    public Booking() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public ParkingListing getParkingId() {
        return parkingId;
    }

    public void setParkingId(ParkingListing parkingId) {
        this.parkingId = parkingId;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public double getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(double totalHours) {
        this.totalHours = totalHours;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public String getQrCodeDataUrl() {
        return qrCodeDataUrl;
    }

    public void setQrCodeDataUrl(String qrCodeDataUrl) {
        this.qrCodeDataUrl = qrCodeDataUrl;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}

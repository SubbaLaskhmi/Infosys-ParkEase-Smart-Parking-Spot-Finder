package com.parkease.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "parking_listings")
public class ParkingListing {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User providerId; // Reference to User

    private String title;
    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private OwnershipRelation ownershipRelation;

    private String addressLine;
    private String city;
    private String pincode;

    @Embedded
    private Location location;

    private String availableFrom;
    private String availableTo;

    @Embedded
    private Dimensions dimensions;

    private int approxTotalCars;

    @Embedded
    private VehicleCapacity vehicleCapacity;

    @Embedded
    private Pricing pricing;

    @ElementCollection
    private List<String> images;

    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.PENDING;
    private String rejectionReason = "";

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;
    @Temporal(TemporalType.TIMESTAMP)
    private Date approvedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    public ParkingListing() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getProviderId() {
        return providerId;
    }

    public void setProviderId(User providerId) {
        this.providerId = providerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OwnershipRelation getOwnershipRelation() {
        return ownershipRelation;
    }

    public void setOwnershipRelation(OwnershipRelation ownershipRelation) {
        this.ownershipRelation = ownershipRelation;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(String availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(String availableTo) {
        this.availableTo = availableTo;
    }

    public Dimensions getDimensions() {
        return dimensions;
    }

    public void setDimensions(Dimensions dimensions) {
        this.dimensions = dimensions;
    }

    public int getApproxTotalCars() {
        return approxTotalCars;
    }

    public void setApproxTotalCars(int approxTotalCars) {
        this.approxTotalCars = approxTotalCars;
    }

    public VehicleCapacity getVehicleCapacity() {
        return vehicleCapacity;
    }

    public void setVehicleCapacity(VehicleCapacity vehicleCapacity) {
        this.vehicleCapacity = vehicleCapacity;
    }

    public Pricing getPricing() {
        return pricing;
    }

    public void setPricing(Pricing pricing) {
        this.pricing = pricing;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public void setStatus(ListingStatus status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Date getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Date approvedAt) {
        this.approvedAt = approvedAt;
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

    @Embeddable
    public static class Location {
        private double lat;
        private double lng;

        public Location() {
        }

        public Location(double lat, double lng) {
            this.lat = lat;
            this.lng = lng;
        }

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }

        public double getLng() {
            return lng;
        }

        public void setLng(double lng) {
            this.lng = lng;
        }
    }

    @Embeddable
    public static class Dimensions {
        private double length;
        private double width;
        private double totalArea;

        public Dimensions() {
        }

        public double getLength() {
            return length;
        }

        public void setLength(double length) {
            this.length = length;
        }

        public double getWidth() {
            return width;
        }

        public void setWidth(double width) {
            this.width = width;
        }

        public double getTotalArea() {
            return totalArea;
        }

        public void setTotalArea(double totalArea) {
            this.totalArea = totalArea;
        }
    }

    @Embeddable
    public static class VehicleCapacity {
        private int twoWheeler = 0;
        private int fourWheeler = 0;
        private int car4Seater = 0;
        private int car6Seater = 0;
        private int suv = 0;

        public VehicleCapacity() {
        }

        public int getTwoWheeler() {
            return twoWheeler;
        }

        public void setTwoWheeler(int twoWheeler) {
            this.twoWheeler = twoWheeler;
        }

        public int getFourWheeler() {
            return fourWheeler;
        }

        public void setFourWheeler(int fourWheeler) {
            this.fourWheeler = fourWheeler;
        }

        public int getCar4Seater() {
            return car4Seater;
        }

        public void setCar4Seater(int car4Seater) {
            this.car4Seater = car4Seater;
        }

        public int getCar6Seater() {
            return car6Seater;
        }

        public void setCar6Seater(int car6Seater) {
            this.car6Seater = car6Seater;
        }

        public int getSuv() {
            return suv;
        }

        public void setSuv(int suv) {
            this.suv = suv;
        }
    }

    @Embeddable
    public static class Pricing {
        private double hourlyRate;

        public Pricing() {
        }

        public double getHourlyRate() {
            return hourlyRate;
        }

        public void setHourlyRate(double hourlyRate) {
            this.hourlyRate = hourlyRate;
        }
    }
}

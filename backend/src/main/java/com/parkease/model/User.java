package com.parkease.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String resetPasswordToken;
    private Date resetPasswordExpire;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(unique = true)
    private String googleId;

    private String phone = "";
    private String licensePlate = "";

    @ElementCollection
    private List<UserVehicle> vehicles = new ArrayList<>();

    private double walletBalance = 0.0;

    private String photo = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    @ManyToMany
    @JoinTable(name = "user_favorites", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "listing_id"))
    private List<ParkingListing> favorites = new ArrayList<>();

    @ElementCollection
    private List<Transaction> transactions = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    public User() {
    }

    public User(String id, String name, String email, String password, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public Date getResetPasswordExpire() {
        return resetPasswordExpire;
    }

    public void setResetPasswordExpire(Date resetPasswordExpire) {
        this.resetPasswordExpire = resetPasswordExpire;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public List<UserVehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<UserVehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public double getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(double walletBalance) {
        this.walletBalance = walletBalance;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<ParkingListing> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<ParkingListing> favorites) {
        this.favorites = favorites;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
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
    public static class UserVehicle {
        private String plate;
        private String model;
        @Enumerated(EnumType.STRING)
        private VehicleType type = VehicleType.FOUR_SEATER;
        private boolean isDefault = false;

        public UserVehicle() {
        }

        public String getPlate() {
            return plate;
        }

        public void setPlate(String plate) {
            this.plate = plate;
        }

        public String getModel() {
            return model;
        }

        public void setModel(String model) {
            this.model = model;
        }

        public VehicleType getType() {
            return type;
        }

        public void setType(VehicleType type) {
            this.type = type;
        }

        public boolean isDefault() {
            return isDefault;
        }

        public void setDefault(boolean isDefault) {
            this.isDefault = isDefault;
        }
    }

    @Embeddable
    public static class Transaction {
        private String type; // credit, debit
        private double amount;
        @Temporal(TemporalType.TIMESTAMP)
        private Date date = new Date();
        private String description;

        public Transaction() {
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}

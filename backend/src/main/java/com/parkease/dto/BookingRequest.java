package com.parkease.dto;

import com.parkease.model.VehicleType;
import java.util.Date;

public class BookingRequest {
    private String parkingId;
    private VehicleType vehicleType;
    private Date startTime;
    private Date endTime;
    private double totalHours;
    private double totalAmount;
    
    public BookingRequest() {}

    public String getParkingId() { return parkingId; }
    public void setParkingId(String parkingId) { this.parkingId = parkingId; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public Date getStartTime() { return startTime; }
    public void setStartTime(Date startTime) { this.startTime = startTime; }

    public Date getEndTime() { return endTime; }
    public void setEndTime(Date endTime) { this.endTime = endTime; }

    public double getTotalHours() { return totalHours; }
    public void setTotalHours(double totalHours) { this.totalHours = totalHours; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}

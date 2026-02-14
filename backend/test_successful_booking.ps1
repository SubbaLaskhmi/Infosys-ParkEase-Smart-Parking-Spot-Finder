# 1. Register Provider
$providerEmail = "provider_flow_test_$(Get-Random)@test.com"
$providerPayload = @{
    name     = "Provider Test"
    email    = $providerEmail
    password = "password123"
    role     = "PROVIDER"
}
$providerJson = $providerPayload | ConvertTo-Json
try {
    $pReg = Invoke-RestMethod -Uri "http://localhost:5002/api/auth/register" -Method Post -Body $providerJson -ContentType "application/json"
    $pToken = $pReg.token
    Write-Host "Provider Registered: $providerEmail"
}
catch {
    Write-Error "Provider Register Failed: $_"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Error "Body: $($reader.ReadToEnd())"
    exit 1
}

# 2. Add Parking Listing (Corrected Payload for ParkingListing.java)
$parkingPayload = @{
    title             = "Test Plaza $(Get-Random)"
    description       = "Test Description"
    addressLine       = "123 Test St"
    city              = "Test City"
    pincode           = "123456"
    
    # Embedded Location
    location          = @{
        lat = 12.9716
        lng = 77.5946
    }
    
    # Embedded Pricing
    pricing           = @{
        hourlyRate = 10.0
    }
    
    availableFrom     = "00:00"
    availableTo       = "23:59"
    
    # Embedded VehicleCapacity
    vehicleCapacity   = @{
        twoWheeler  = 10
        fourWheeler = 10
        car4Seater  = 10
        car6Seater  = 10
        suv         = 10
    }
    
    # Embedded Dimensions
    dimensions        = @{
        length    = 20.0
        width     = 10.0
        totalArea = 200.0
    }
    
    images            = @("http://example.com/placeholder.jpg")
    approxTotalCars   = 50
    
    # ENUM OwnershipRelation
    ownershipRelation = "SELF"
}
$parkingJson = $parkingPayload | ConvertTo-Json -Depth 5
$pHeaders = @{Authorization = "Bearer $pToken" }

try {
    # Endpoint: /api/provider/listings
    $response = Invoke-RestMethod -Uri "http://localhost:5002/api/provider/listings" -Method Post -Headers $pHeaders -Body $parkingJson -ContentType "application/json"
    
    # ProviderController returns: { success: true, message: "...", data: { id: "..." } }
    $parkingId = $response.data.id
    Write-Host "Parking Created: $parkingId"
}
catch {
    Write-Error "Parking Create Failed: $_"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Error "Body: $($reader.ReadToEnd())"
    exit 1
}

# 3. Register Driver
$driverEmail = "driver_flow_test_$(Get-Random)@test.com"
$driverPayload = @{
    name     = "Driver Test"
    email    = $driverEmail
    password = "password123"
    role     = "USER"
}
$driverJson = $driverPayload | ConvertTo-Json
try {
    $dReg = Invoke-RestMethod -Uri "http://localhost:5002/api/auth/register" -Method Post -Body $driverJson -ContentType "application/json"
    $dToken = $dReg.token
    Write-Host "Driver Registered: $driverEmail"
}
catch {
    Write-Error "Driver Register Failed: $_"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Error "Body: $($reader.ReadToEnd())"
    exit 1
}

# 4. Book the Spot
$bookingPayload = @{
    parkingId   = $parkingId
    vehicleType = "FOUR_SEATER"
    startTime   = (Get-Date).AddDays(1).ToString("yyyy-MM-ddTHH:mm:ss")
    endTime     = (Get-Date).AddDays(1).AddHours(2).ToString("yyyy-MM-ddTHH:mm:ss")
    totalHours  = 2
    totalAmount = 20.0
}

$bookingJson = $bookingPayload | ConvertTo-Json
$dHeaders = @{Authorization = "Bearer $dToken" }

try {
    $booking = Invoke-RestMethod -Uri "http://localhost:5002/api/bookings" -Method Post -Headers $dHeaders -Body $bookingJson -ContentType "application/json"
    Write-Host "Booking SUCCESSFUL!"
    Write-Host "Booking ID: $($booking.bookingId)"
}
catch {
    Write-Error "Booking Failed: $_"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Error "Body: $($reader.ReadToEnd())"
    exit 1
}

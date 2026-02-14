try {
    Write-Host "Reading token..."
    $json = Get-Content "token.json" -Raw | ConvertFrom-Json
    $token = $json.token
    $headers = @{Authorization = "Bearer $token" }

    $parkingId = "2813c62b-e108-4720-8294-11ffebf43c4c" 
    # Note: Use the ID from the previous run if possible, or fetch list

    Write-Host "Fetching specific parking details for ID: $parkingId"
    # Assuming endpoint is /api/parkings/{id}
    try {
        $parking = Invoke-RestMethod -Uri "http://localhost:5002/api/parkings/$parkingId" -Headers $headers -Method Get
        Write-Host "Parking Found: $($parking.title)"
        Write-Host "Capacity Details:"
        Write-Host ($parking.vehicleCapacity | ConvertTo-Json -Depth 2)
    }
    catch {
        Write-Warning "Could not fetch specific parking. Fetching all..."
        $all = Invoke-RestMethod -Uri "http://localhost:5002/api/parkings" -Headers $headers -Method Get
        $parking = $all | Where-Object { $_.id -eq $parkingId }
        
        if (-not $parking) {
            Write-Host "Using first available parking..."
            $parking = $all[0]
            $parkingId = $parking.id
        }
        
        Write-Host "Target Parking: $($parking.title) (ID: $parkingId)"
        Write-Host "Capacity Details:"
        Write-Host ($parking.vehicleCapacity | ConvertTo-Json -Depth 2)
    }

}
catch {
    Write-Error "Error: $_"
    exit 1
}

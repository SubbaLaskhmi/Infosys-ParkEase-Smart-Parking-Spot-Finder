
const axios = require('axios');

const API_URL = 'http://localhost:5002/api';

async function testFlow() {
    const timestamp = Date.now();
    const email = `provider${timestamp}@test.com`;
    const password = "password123";

    try {
        // 1. Register
        console.log(`1. Registering ${email}...`);
        await axios.post(`${API_URL}/auth/register`, {
            name: "Test Provider",
            email: email,
            password: password,
            role: "PROVIDER"
        });
        console.log("Registration success.");

        // 2. Login
        console.log("2. Logging in...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });

        const token = loginRes.data.token;
        const role = loginRes.data.role;
        console.log("Login success. Role:", role);
        console.log("Token:", token.substring(0, 20) + "...");

        if (role !== "PROVIDER") {
            console.error("CRITICAL: Role mismatch! Expected PROVIDER, got", role);
            return;
        }

        // 3. Create Listing
        console.log("3. Creating listing...");
        const listing = {
            title: `Test Parking ${timestamp}`,
            description: "Test Description",
            city: "Test City",
            addressLine: "123 Test St",
            location: { lat: 10, lng: 10 },
            pricing: { hourlyRate: 20 },
            approxTotalCars: 10,
            vehicleCapacity: { twoWheeler: 5, fourWheeler: 5 },
            availableFrom: "09:00",
            availableTo: "18:00"
        };

        const createRes = await axios.post(`${API_URL}/provider/listings`, listing, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Creation success! ID:", createRes.data.id);

    } catch (e) {
        console.error("Error occurred:");
        if (e.response) {
            console.error(`Status: ${e.response.status} ${e.response.statusText}`);
            console.error("Data:", e.response.data);
        } else {
            console.error(e.message);
        }
    }
}

testFlow();

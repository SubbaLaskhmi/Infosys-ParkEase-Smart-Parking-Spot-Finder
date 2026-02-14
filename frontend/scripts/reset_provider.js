
import axios from 'axios';

const API_Base = 'http://localhost:5002/api';

async function resetProviderPassword() {
    console.log('\n--- Resetting Password for provider@gmail.com ---');
    try {
        // 1. Login as Admin
        console.log('Logging in as Admin...');
        const loginRes = await axios.post(`${API_Base}/auth/login`, {
            email: 'admin@parkease.com',
            password: 'admin123'
        });
        const token = loginRes.data.token;
        console.log('Admin Login Successful');

        // 2. Get All Users
        console.log('Fetching Users...');
        const usersRes = await axios.get(`${API_Base}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const provider = usersRes.data.find(u => u.email === 'provider@gmail.com');
        if (!provider) {
            console.error('User provider@gmail.com NOT FOUND');
            return;
        }
        console.log(`Found provider user: ${provider.id}`);

        // 3. Update Password
        console.log('Updating Password...');
        const updateRes = await axios.put(`${API_Base}/admin/users/${provider.id}`, {
            password: 'provider123'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Password Update Successful:', updateRes.data);

        // 4. Verify Login
        console.log('Verifying Login...');
        const verifyRes = await axios.post(`${API_Base}/auth/login`, {
            email: 'provider@gmail.com',
            password: 'provider123'
        });
        console.log('Verification Login Successful! Token:', verifyRes.data.token.substring(0, 10) + '...');

    } catch (error) {
        if (error.response) {
            console.error('Operation Failed Status:', error.response.status);
            console.error('Operation Failed Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

resetProviderPassword();

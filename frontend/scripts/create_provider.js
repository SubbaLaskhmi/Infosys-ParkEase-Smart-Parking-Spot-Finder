
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth/register';

async function createProvider() {
    console.log('\n--- Creating provider@gmail.com ---');
    try {
        const response = await axios.post(API_URL, {
            name: 'Demo Provider',
            email: 'provider@gmail.com',
            password: 'provider123',
            role: 'PROVIDER'
        });
        console.log('Provider Created Successfully:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Registration Failed Status:', error.response.status);
            console.error('Registration Failed Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

createProvider();

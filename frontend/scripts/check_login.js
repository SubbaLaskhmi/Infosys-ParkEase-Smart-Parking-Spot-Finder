
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth/login';

async function checkLogin() {
    console.log('\n--- Checking provider@gmail.com ---');
    try {
        const response = await axios.post(API_URL, {
            email: 'provider@gmail.com',
            password: 'provider123'
        });
        console.log('Login Successful:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Login Failed Status:', error.response.status);
            console.error('Login Failed Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

async function checkOwnerLogin() {
    console.log('\n--- Checking owner@parkease.com ---');
    try {
        const response = await axios.post(API_URL, {
            email: 'owner@parkease.com',
            password: 'owner123'
        });
        console.log('Owner Login Successful. Role:', response.data.role);
    } catch (error) {
        if (error.response) {
            console.error('Owner Login Failed Status:', error.response.status);
            console.error('Owner Login Failed Data:', error.response.data);
        } else {
            console.error('Owner Login Error:', error.message);
        }
    }
}

async function run() {
    await checkLogin();
    await checkOwnerLogin();
}

run();

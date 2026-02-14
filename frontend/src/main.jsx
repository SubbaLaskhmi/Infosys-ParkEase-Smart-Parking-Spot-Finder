import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './components/ErrorBoundary';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import { BrowserRouter as Router } from 'react-router-dom';

// console.log("ParkEase Main Entry Loaded");
// console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "dummy_client_id_to_prevent_crash"}>
                <Router>
                    <AuthProvider>
                        <ThemeProvider>
                            <ToastProvider>
                                <App />
                            </ToastProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </Router>
            </GoogleOAuthProvider>
        </ErrorBoundary>
    </StrictMode>,
)

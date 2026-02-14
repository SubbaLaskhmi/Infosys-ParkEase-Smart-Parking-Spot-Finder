import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../services/api';
import { Loader2, CheckCircle, XCircle, Scan } from 'lucide-react';

const ProviderScan = () => {
    const [scanResult, setScanResult] = useState(null); // The booking ID or Payload
    const [bookingDetails, setBookingDetails] = useState(null); // Metadata from scan
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [scannerActive, setScannerActive] = useState(true);

    useEffect(() => {
        let scanner;

        if (scannerActive && !scanResult) {
            scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);
        }

        function onScanSuccess(decodedText) {
            try {
                // Try parsing if it's JSON
                const data = JSON.parse(decodedText);
                setBookingDetails(data);
                // Assume bookingId is in data.bookingId
                setScanResult(data.bookingId);
                setStatusMessage('QR Code Scanned! Ready to process.');

                // Stop scanning cleanly
                if (scanner) {
                    scanner.clear().catch(err => console.error("Failed to clear scanner", err));
                    setScannerActive(false);
                }
            } catch {
                // Determine if it is a simple string ID

                setScanResult(decodedText);
                setBookingDetails({ bookingId: decodedText });
                setStatusMessage('QR Code Scanned! Ready to process.');

                if (scanner) {
                    scanner.clear().catch(err => console.error("Failed to clear scanner", err));
                    setScannerActive(false);
                }
            }
        }

        function onScanFailure() {
            // console.warn(`Code scan error = ${error}`);
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(err => console.error("Failed to clear scanner", err));
            }
        };
    }, [scannerActive, scanResult]);

    const handleReset = () => {
        setScanResult(null);
        setBookingDetails(null);
        setStatusMessage('');
        setScannerActive(true);
    };

    const processBooking = async (action) => {
        if (!scanResult) return;
        setLoading(true);
        try {
            const endpoint = `/bookings/${scanResult}/${action}`; // action: 'checkin' or 'checkout'
            const res = await api.put(endpoint);
            setStatusMessage(`Success: ${res.data.message}`);
            // Optionally fetch updated booking info if needed
        } catch (error) {
            setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-primary">Provider Scanner</h1>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
                {/* Scanner View */}
                {scannerActive && (
                    <div className="mb-6">
                        <div id="reader" className="rounded-lg overflow-hidden border-2 border-primary/50"></div>
                        <p className="text-center text-slate-400 mt-2 text-sm">Align QR code within the frame</p>
                    </div>
                )}

                {/* Result Section */}
                {scanResult && (
                    <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <Scan className="w-12 h-12 mx-auto text-primary mb-2" />
                            <h3 className="text-xl font-semibold">{bookingDetails?.bookingId || scanResult}</h3>
                            {bookingDetails?.startTime && (
                                <p className="text-sm text-slate-400">
                                    Start: {new Date(bookingDetails.startTime).toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => processBooking('checkin')}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                                Check In
                            </button>

                            <button
                                onClick={() => processBooking('checkout')}
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <XCircle />}
                                Check Out
                            </button>
                        </div>

                        {statusMessage && (
                            <div className={`p-3 rounded-lg text-sm font-medium ${statusMessage.includes('Error')
                                ? 'bg-red-500/10 text-red-500'
                                : 'bg-green-500/10 text-green-500'
                                }`}>
                                {statusMessage}
                            </div>
                        )}

                        <button
                            onClick={handleReset}
                            className="text-slate-400 hover:text-white underline text-sm"
                        >
                            Scan Another Ticket
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderScan;

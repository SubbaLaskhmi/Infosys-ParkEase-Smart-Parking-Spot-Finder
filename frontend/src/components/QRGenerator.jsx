import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, CheckCircle, Smartphone, Navigation } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = ({ isOpen, onClose, booking }) => {
    if (!isOpen || !booking) return null;

    const handleDownload = () => {
        const canvas = document.getElementById('qr-code-canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            let downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `parkease-ticket-${booking.bookingId || booking.id}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'ParkEase Booking',
                    text: `Booking ID: ${booking.bookingId || booking.id}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[2000] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-8 -translate-y-8"></div>

                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Your Ticket</h2>
                                <p className="text-blue-100 text-sm">Booking Confirmed!</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                        {/* Success Badge */}
                        <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl py-3">
                            <CheckCircle className="text-green-500" size={20} />
                            <span className="text-green-400 font-semibold">Payment Successful</span>
                        </div>

                        {/* QR Code */}
                        <div className="bg-white p-6 rounded-2xl shadow-inner flex flex-col items-center">
                            <QRCodeCanvas
                                id="qr-code-canvas"
                                value={booking.bookingId || booking.id || 'BOOKING-123'}
                                size={220}
                                level="H"
                                includeMargin={true}
                                className="rounded-lg"
                            />
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                                    Booking ID
                                </p>
                                <p className="font-mono text-gray-900 font-bold text-lg">
                                    {booking.bookingId || booking.id}
                                </p>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Parking Spot</span>
                                <span className="text-white font-semibold">
                                    {booking.parkingName || 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Amount Paid</span>
                                <span className="text-white font-semibold">
                                    ₹{booking.totalAmount || booking.amount || '0'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Status</span>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">
                                    CONFIRMED
                                </span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <Smartphone className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">
                                        Show this code at the parking
                                    </p>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        Present this QR code to the parking provider for check-in. Keep this ticket until you leave.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    if (booking.location) {
                                        const { lat, lng } = booking.location;
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                                    }
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                            >
                                <Navigation size={18} />
                                Navigate to Parking
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleDownload}
                                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                                >
                                    <Download size={18} />
                                    Download
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30"
                                >
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QRGenerator;

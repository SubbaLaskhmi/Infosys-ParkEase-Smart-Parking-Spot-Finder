import React from "react";
// Simple Card components to replace the missing @/components/ui/card
const Card = ({ className, children }) => (
    <div className={`rounded-xl shadow-sm ${className}`}>
        {children}
    </div>
);

const CardContent = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

export default function ProjectScope() {
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">ParkEase — Mentor Explanation</h1>
                    <p className="text-white/60 mt-2">
                        This page contains the project scope and implementation flow (User, Parking Provider, Admin).
                    </p>
                </div>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold">System Roles (3 logins)</h2>
                        <ul className="list-disc pl-6 text-white/80 space-y-1">
                            <li>User / Driver</li>
                            <li>Parking Provider</li>
                            <li>Admin</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">1) User / Driver Flow</h2>
                        <ul className="list-disc pl-6 text-white/80 space-y-1">
                            <li>Register/Login</li>
                            <li>Search parking using location (lat/lng) + filters</li>
                            <li>View parking details: images, address, timing, rate/hour, slots</li>
                            <li>Book a slot by selecting start time and end time</li>
                            <li>Get booking ticket (QR / Booking ID)</li>
                            <li>View: Active Tickets + Booking History</li>
                            <li>Timer reminders: 3 hrs left, 2 hrs left, 1 hr left</li>
                            <li>Extend booking before time ends</li>
                            <li>Payments: dummy now, real gateway later</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">2) Parking Provider Flow</h2>
                        <ul className="list-disc pl-6 text-white/80 space-y-1">
                            <li>Upload parking plot images</li>
                            <li>Address + geo-location (lat/lng)</li>
                            <li>Ownership relation (self / father / guardian / wife / son etc.)</li>
                            <li>Parking available timing (8AM–8PM or evening only)</li>
                            <li>Set hourly pricing</li>
                            <li>Parking area dimensions (width + height / total size)</li>
                            <li>
                                Auto-calculate capacity for car types:
                                <ul className="list-disc pl-6 mt-1 space-y-1">
                                    <li>4-seater → 3 cars approx</li>
                                    <li>6-seater → 2 cars approx</li>
                                    <li>SUV/LandCruiser → 1–2 cars approx</li>
                                </ul>
                            </li>
                            <li>Submit for Admin approval</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">3) Admin Flow</h2>
                        <ul className="list-disc pl-6 text-white/80 space-y-1">
                            <li>Approve / Reject provider listings</li>
                            <li>Without approval, listing must not be visible to users</li>
                            <li>If rejected, admin must give a rejection reason</li>
                            <li>Provider can modify and reapply</li>
                            <li>Dashboard shows: total parkings, cars in/out, occupancy, bookings</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">Special Condition</h2>
                        <p className="text-white/80">
                            Slot allocation should consider vehicle size. Example: if already 3 cars parked in a small plot,
                            Etiga can park ✅ but LandCruiser cannot ❌. Vehicle dimension decides availability.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">Test Cases</h2>
                        <ul className="list-disc pl-6 text-white/80 space-y-1">
                            <li>Booking overlap prevention</li>
                            <li>Extend booking before timer ends</li>
                            <li>Cancel booking + refunds flow</li>
                            <li>No-show scenario</li>
                            <li>Provider reject + reapply flow</li>
                            <li>Capacity calculation correctness</li>
                            <li>Large vehicle rejection logic</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="border border-white/10 rounded-xl p-5 bg-white/5">
                    <p className="text-white/90 font-medium">Closing Summary</p>
                    <p className="text-white/70 mt-2">
                        “Provider creates and manages parking availability, Admin controls approval & monitoring, and Users book slots,
                        view tickets/history, and extend bookings with timer notifications.”
                    </p>
                </div>
            </div>
        </div>
    );
}

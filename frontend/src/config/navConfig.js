import {
    Search,
    Ticket,
    Wallet,
    User,
    LayoutDashboard,
    PlusCircle,
    ScanLine,
    CheckSquare,
    Users,
    Clock,
    Heart
} from 'lucide-react';

export const NAV_ITEMS = {
    USER: [
        { path: '/find', label: 'Find Spot', icon: Search },
        { path: '/tickets', label: 'My Bookings', icon: Ticket },
        { path: '/history', label: 'History', icon: Clock },
        { path: '/favorites', label: 'Favorites', icon: Heart },
        { path: '/wallet', label: 'Wallet', icon: Wallet },
        { path: '/profile', label: 'Profile', icon: User }
    ],
    PROVIDER: [
        { path: '/owner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/owner/add-parking', label: 'Add Parking', icon: PlusCircle },
        { path: '/owner/scan', label: 'QR Scanner', icon: ScanLine },
        { path: '/profile', label: 'Profile', icon: User }
    ],
    ADMIN: [
        { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/approvals', label: 'Approvals', icon: CheckSquare },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/profile', label: 'Profile', icon: User }
    ]
};

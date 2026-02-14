import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Layout from './components/Layout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Driver Layout & Dashboard
import DriverLayout from './layouts/DriverLayout';
import DriverDashboard from './dashboards/driver/DriverDashboard';
import MyBookings from './dashboards/driver/MyBookings';
import Tickets from './dashboards/driver/Tickets';
import History from './dashboards/driver/History';
import Profile from './dashboards/driver/Profile';

import Wallet from './pages/Wallet'; // Keep wallet in pages if not generic? Or move it too? Assuming specific for now.
import Favorites from './pages/Favorites';
import Home from './pages/Home'; // "Find Parking"
import ParkingDetails from './pages/ParkingDetails';
import Notifications from './pages/Notifications';

// Provider Pages
// Provider Pages
import OwnerLayout from './dashboards/owner/OwnerLayout';
import OwnerDashboard from './dashboards/owner/OwnerDashboard';
import MyParkings from './dashboards/owner/MyParkings';
import OwnerBookings from './dashboards/owner/OwnerBookings';
import OwnerEarnings from './dashboards/owner/OwnerEarnings';
import OwnerProfile from './dashboards/owner/OwnerProfile';
import AddParking from './pages/AddParking'; // Keep AddParking in pages? Or move to dashboards/owner/AddParking?
import ProviderScan from './pages/ProviderScan'; // Unused?

// Admin Pages
// Admin Pages
import AdminLayout from './dashboards/admin/AdminLayout';
import AdminDashboard from './dashboards/admin/AdminDashboard';
import UserManagement from './dashboards/admin/UserManagement';
import AdminSettings from './dashboards/admin/AdminSettings';
import AdminApprovals from './pages/admin/AdminApprovals';

// --- Route Guards ---

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  if (user) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'PROVIDER') return <Navigate to="/owner" replace />;
    return <Navigate to="/driver" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'PROVIDER') return <Navigate to="/owner" replace />;
    return <Navigate to="/driver" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><PublicRoute><Landing /></PublicRoute></PageTransition>} />
        <Route path="/login" element={<PageTransition><PublicRoute><Login /></PublicRoute></PageTransition>} />
        <Route path="/register" element={<PageTransition><PublicRoute><Register /></PublicRoute></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><PublicRoute><ForgotPassword /></PublicRoute></PageTransition>} />
        <Route path="/reset-password/:token" element={<PageTransition><PublicRoute><ResetPassword /></PublicRoute></PageTransition>} />

        {/* Driver Routes (Nested Layout) */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverDashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="history" element={<History />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Legacy/Top-level Routes accessed by Driver */}
        {/* Legacy/Top-level Routes accessed by Driver */}
        <Route path="/find" element={<PageTransition><ProtectedRoute allowedRoles={['USER']}><Home /></ProtectedRoute></PageTransition>} />
        <Route path="/parking/:id" element={<PageTransition><ProtectedRoute allowedRoles={['USER']}><ParkingDetails /></ProtectedRoute></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><ProtectedRoute allowedRoles={['USER']}><Favorites /></ProtectedRoute></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><ProtectedRoute allowedRoles={['USER', 'PROVIDER', 'ADMIN']}><Notifications /></ProtectedRoute></PageTransition>} />

        {/* Provider Routes (Space Owner) */}
        <Route path="/owner" element={<ProtectedRoute allowedRoles={['PROVIDER']}><OwnerLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="add-parking" element={<AddParking />} />
          <Route path="edit-parking/:id" element={<AddParking />} />
          <Route path="scan" element={<ProviderScan />} />
          <Route path="parkings" element={<MyParkings />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route path="earnings" element={<OwnerEarnings />} />
          <Route path="profile" element={<OwnerProfile />} />
        </Route>

        {/* Admin Routes */}
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="approvals" element={<AdminApprovals />} />          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppWithToaster() {
  return (
    <>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default AppWithToaster;

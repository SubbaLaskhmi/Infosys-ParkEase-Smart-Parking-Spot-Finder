import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PanelSelectionScreen from '../screens/PanelSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import ProviderDetailsScreen from '../screens/ProviderDetailsScreen';
import ProviderDashboardScreen from '../screens/ProviderDashboardScreen';
import ProviderVehicleListScreen from '../screens/ProviderVehicleListScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import ProviderNotificationsScreen from '../screens/ProviderNotificationsScreen';
import ProviderParkingLotsScreen from '../screens/ProviderParkingLotsScreen';
import ProviderEVManagementScreen from '../screens/ProviderEVManagementScreen';
import ProviderEarningsScreen from '../screens/ProviderEarningsScreen';
import ProviderSettingsScreen from '../screens/ProviderSettingsScreen';

import DriverDashboardScreen from '../screens/DriverDashboardScreen';
import SlotSelectionScreen from '../screens/SlotSelectionScreen';
import WalletScreen from '../screens/WalletScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import SavedPlacesScreen from '../screens/SavedPlacesScreen';
import DriverSettingsScreen from '../screens/DriverSettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F3F4F6' } }}>
            <Stack.Screen name="PanelSelection" component={PanelSelectionScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            {/* Admin */}
            <Stack.Screen name="AdminLogin" component={LoginScreen} initialParams={{ title: "Admin", panel: "Admin Panel", dashboardScreen: "AdminDashboard" }} />
            <Stack.Screen name="AdminRegister" component={RegisterScreen} initialParams={{ title: "Admin", panel: "Admin Panel" }} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
            <Stack.Screen name="ProviderDetails" component={ProviderDetailsScreen} />

            {/* Driver */}
            <Stack.Screen name="DriverLogin" component={LoginScreen} initialParams={{ title: "Driver", panel: "Driver Panel", dashboardScreen: "DriverDashboard" }} />
            <Stack.Screen name="DriverRegister" component={RegisterScreen} initialParams={{ title: "Driver", panel: "Driver Panel" }} />
            <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
            <Stack.Screen name="SlotSelection" component={SlotSelectionScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
            <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
            <Stack.Screen name="DriverSettings" component={DriverSettingsScreen} />

            {/* Provider */}
            <Stack.Screen name="ProviderLogin" component={LoginScreen} initialParams={{ title: "Provider", panel: "Provider Panel", dashboardScreen: "ProviderDashboard" }} />
            <Stack.Screen name="ProviderRegister" component={RegisterScreen} initialParams={{ title: "Provider", panel: "Provider Panel" }} />
            <Stack.Screen name="ProviderDashboard" component={ProviderDashboardScreen} />
            <Stack.Screen name="ProviderVehicleList" component={ProviderVehicleListScreen} />
            <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
            <Stack.Screen name="ProviderNotifications" component={ProviderNotificationsScreen} />
            <Stack.Screen name="ProviderParkingLots" component={ProviderParkingLotsScreen} />
            <Stack.Screen name="ProviderEVManagement" component={ProviderEVManagementScreen} />
            <Stack.Screen name="ProviderEarnings" component={ProviderEarningsScreen} />
            <Stack.Screen name="ProviderSettings" component={ProviderSettingsScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

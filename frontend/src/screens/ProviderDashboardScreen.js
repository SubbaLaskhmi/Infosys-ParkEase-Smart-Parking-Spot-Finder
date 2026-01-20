import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import DashboardHeader from '../components/DashboardHeader';
import MenuModal from '../components/MenuModal';

const { width } = Dimensions.get('window');

const ProviderDashboardScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const stats = [
        { id: 1, label: 'Earnings', value: '₹12,450', icon: 'wallet', color: COLORS.success },
        { id: 2, label: 'Active Spots', value: '24/30', icon: 'parking', color: COLORS.primary },
        { id: 3, label: 'EV Status', value: '3 Active', icon: 'flash', color: COLORS.warning },
    ];

    const menuItems = [
        { label: 'Profile', icon: 'user-astronaut', color: COLORS.primary },
        { label: 'My Vehicles', icon: 'car-side', color: COLORS.secondary, nav: 'ProviderVehicleList' },
        { label: 'Parking Lots', icon: 'map-marked-alt', color: COLORS.accent, nav: 'ProviderParkingLots' },
        { label: 'EV Management', icon: 'bolt', color: COLORS.warning, nav: 'ProviderEVManagement' },
        { label: 'Earnings', icon: 'chart-line', color: COLORS.success, nav: 'ProviderEarnings' },
        { label: 'Notifications', icon: 'bell', color: COLORS.accent, nav: 'ProviderNotifications' },
        { label: 'Settings', icon: 'cog', color: COLORS.textSub, nav: 'ProviderSettings' },
        { label: 'Logout', icon: 'sign-out-alt', color: COLORS.error }
    ];

    const quickActions = [
        { label: 'Add Lot', icon: 'add-business', color: COLORS.primary, nav: 'ProviderParkingLots' },
        { label: 'Vehicle List', icon: 'directions-car', color: COLORS.secondary, nav: 'ProviderVehicleList' },
        { label: 'Earnings', icon: 'payments', color: COLORS.success, nav: 'ProviderEarnings' },
        { label: 'EV Status', icon: 'ev-station', color: COLORS.warning, nav: 'ProviderEVManagement' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <DashboardHeader
                title="Provider Hub"
                userRole="Parking Provider"
                onMenuPress={() => setMenuVisible(true)}
            />

            <MenuModal
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                menuItems={menuItems}
                userRole="Parking Provider"
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.statsGrid}>
                    {stats.map(stat => (
                        <View key={stat.id} style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                                {stat.icon === 'flash' ? (
                                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                                ) : (
                                    <FontAwesome5 name={stat.icon} size={20} color={stat.color} />
                                )}
                            </View>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {quickActions.map((action, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.actionItem}
                                onPress={() => navigation.navigate(action.nav)}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                                    <MaterialIcons name={action.icon} size={28} color="#fff" />
                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={[styles.section, { marginBottom: 30 }]}>
                    <View style={styles.promoCard}>
                        <LinearGradient
                            colors={[COLORS.secondary, COLORS.primary]}
                            style={styles.promoGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View>
                                <Text style={styles.promoTitle}>Upgrade to Premium</Text>
                                <Text style={styles.promoSub}>Get advanced analytics for your lots</Text>
                            </View>
                            <TouchableOpacity style={styles.promoBtn}>
                                <Text style={styles.promoBtnText}>View</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { padding: 20 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    statCard: { width: (width - 60) / 3, backgroundColor: '#fff', padding: 15, borderRadius: 20, elevation: 4 },
    statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    statLabel: { fontSize: 11, color: COLORS.textSub, fontWeight: '600' },
    statValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginTop: 4 },
    section: { marginTop: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 15 },
    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    actionItem: { width: (width - 60) / 2, backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 15, alignItems: 'center', flexDirection: 'row', elevation: 2 },
    actionIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    actionLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },
    promoCard: { borderRadius: 24, overflow: 'hidden', elevation: 8 },
    promoGradient: { padding: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    promoTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
    promoBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
    promoBtnText: { color: COLORS.primary, fontWeight: 'bold' }
});

export default ProviderDashboardScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import DashboardHeader from '../components/DashboardHeader';
import MenuModal from '../components/MenuModal';

const { width } = Dimensions.get('window');

const AdminDashboardScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const stats = [
        { id: 1, label: 'Drivers', value: '1,240', icon: 'car', color: COLORS.primary },
        { id: 2, label: 'Providers', value: '450', icon: 'parking', color: COLORS.secondary },
        { id: 3, label: 'Active Bookings', value: '89', icon: 'check-circle', color: COLORS.success },
        { id: 4, label: 'Revenue', value: '₹45k', icon: 'wallet', color: COLORS.warning },
    ];

    const menuItems = [
        { label: 'Profile', icon: 'user-astronaut', color: COLORS.primary },
        { label: 'Platform Settings', icon: 'cog', color: COLORS.textSub },
        { label: 'Logout', icon: 'sign-out-alt', color: COLORS.error }
    ];

    const drivers = [
        { id: 1, name: 'Rahul Kumar', car: 'Toyota Camry', lic: 'DL-9324', status: 'Active' },
        { id: 2, name: 'Amit Singh', car: 'Honda Civic', lic: 'UP-0192', status: 'Inactive' },
        { id: 3, name: 'Suresh Raina', car: 'Maruti Dzire', lic: 'HR-2819', status: 'Active' },
    ];

    const providers = [
        { id: 1, name: 'City Parking', lots: 12, centas: 4, status: 'Verified' },
        { id: 2, name: 'Metro Plaza', lots: 8, centas: 2, status: 'Verified' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <DashboardHeader
                title="Admin Overview"
                userRole="Administrator"
                onMenuPress={() => setMenuVisible(true)}
            />

            <MenuModal
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                menuItems={menuItems}
                userRole="Administrator"
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.statsGrid}>
                    {stats.map(stat => (
                        <View key={stat.id} style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                                <FontAwesome5 name={stat.icon} size={20} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Manage Drivers</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {drivers.map(driver => (
                        <TouchableOpacity
                            key={driver.id}
                            style={styles.listItem}
                            onPress={() => navigation.navigate('DriverDetails', { driver })}
                        >
                            <View style={styles.listIcon}>
                                <FontAwesome5 name="user" size={18} color={COLORS.primary} />
                            </View>
                            <View style={styles.listText}>
                                <Text style={styles.listTitle}>{driver.name}</Text>
                                <Text style={styles.listSubtitle}>{driver.car} • {driver.lic}</Text>
                            </View>
                            <View style={[styles.statusTag, { backgroundColor: driver.status === 'Active' ? '#D1FAE5' : '#F3F4F6' }]}>
                                <Text style={[styles.statusText, { color: driver.status === 'Active' ? COLORS.success : COLORS.textSub }]}>
                                    {driver.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Parking Providers</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {providers.map(provider => (
                        <TouchableOpacity
                            key={provider.id}
                            style={styles.listItem}
                            onPress={() => navigation.navigate('ProviderDetails', { provider })}
                        >
                            <View style={styles.listIcon}>
                                <MaterialIcons name="business" size={24} color={COLORS.secondary} />
                            </View>
                            <View style={styles.listText}>
                                <Text style={styles.listTitle}>{provider.name}</Text>
                                <Text style={styles.listSubtitle}>{provider.lots} Locations • {provider.centas} EV Centas</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { padding: 20 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
    statCard: { width: (width - 55) / 2, backgroundColor: '#fff', padding: 20, borderRadius: 25, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    statValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    statLabel: { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
    section: { marginTop: 30 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    seeAllText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 10, elevation: 2 },
    listIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    listText: { flex: 1 },
    listTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    listSubtitle: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
    statusTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 10, fontWeight: 'bold' }
});

export default AdminDashboardScreen;

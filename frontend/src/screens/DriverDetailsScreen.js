import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const DriverDetailsScreen = ({ route, navigation }) => {
    const { driver } = route.params;

    const stats = [
        { label: 'Rides', value: '342', icon: 'directions-car', color: COLORS.primary },
        { label: 'Points', value: '1.2k', icon: 'stars', color: COLORS.warning },
        { label: 'Rating', value: '4.8', icon: 'star', color: COLORS.success },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <View style={styles.avatarContainer}>
                            <FontAwesome5 name="user-alt" size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.driverName}>{driver.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: driver.status === 'Active' ? 'rgba(5, 150, 105, 0.2)' : 'rgba(107, 114, 128, 0.2)' }]}>
                            <View style={[styles.statusDot, { backgroundColor: driver.status === 'Active' ? COLORS.success : COLORS.textSub }]} />
                            <Text style={[styles.statusText, { color: driver.status === 'Active' ? '#D1FAE5' : '#F3F4F6' }]}>{driver.status.toUpperCase()}</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    <View style={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <View key={i} style={styles.statBox}>
                                <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                                    <MaterialIcons name={stat.icon} size={24} color={stat.color} />
                                </View>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Vehicle Details</Text>
                        <View style={styles.card}>
                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Model</Text>
                                    <Text style={styles.infoValue}>{driver.car}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Plate No</Text>
                                    <Text style={styles.infoValue}>{driver.lic}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>EV Type</Text>
                                    <Text style={styles.infoValue}>Full Electric</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Reg Date</Text>
                                    <Text style={styles.infoValue}>12/2023</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <View style={styles.activityItem}>
                            <View style={styles.activityDot} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activityTitle}>Booked City Center Garage</Text>
                                <Text style={styles.activityTime}>2 hours ago • ₹50</Text>
                            </View>
                        </View>
                        <View style={styles.activityItem}>
                            <View style={styles.activityDot} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activityTitle}>Added ₹500 to Wallet</Text>
                                <Text style={styles.activityTime}>Yesterday, 4:30 PM</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>Send Message</Text>
                        <MaterialIcons name="send" size={18} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { height: 280, padding: 25, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    backBtn: { alignSelf: 'flex-start', padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    headerInfo: { alignItems: 'center', marginTop: 10 },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    driverName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 15 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 10 },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
    statusText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    content: { padding: 25 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -60, marginBottom: 30 },
    statBox: { width: (width - 70) / 3, backgroundColor: '#fff', padding: 15, borderRadius: 22, alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    statIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    statLabel: { fontSize: 11, color: COLORS.textSub, marginTop: 2 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 22, padding: 20, elevation: 2 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
    infoItem: { flex: 1 },
    infoLabel: { fontSize: 12, color: COLORS.textSub, marginBottom: 4 },
    infoValue: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
    activityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, marginLeft: 5 },
    activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 6, marginRight: 15 },
    activityTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
    activityTime: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
    actionBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 10 }
});

export default DriverDetailsScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const VehicleDetailsScreen = ({ route, navigation }) => {
    const { vehicle } = route.params;

    const specs = [
        { label: 'Battery', value: '85%', icon: 'battery-charging-full', color: COLORS.success },
        { label: 'Range', value: '320 km', icon: 'speed', color: COLORS.primary },
        { label: 'Time', value: '45m left', icon: 'timer', color: COLORS.warning },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <View style={styles.vehicleIcon}>
                            <FontAwesome5 name="car-side" size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.vehicleName}>{vehicle.type}</Text>
                        <Text style={styles.plateNumber}>{vehicle.plate}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    <View style={styles.specsGrid}>
                        {specs.map((spec, i) => (
                            <View key={i} style={styles.specBox}>
                                <MaterialIcons name={spec.icon} size={28} color={spec.color} />
                                <Text style={styles.specValue}>{spec.value}</Text>
                                <Text style={styles.specLabel}>{spec.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Owner Information</Text>
                        <View style={styles.card}>
                            <View style={styles.ownerRow}>
                                <View style={styles.avatarMini}>
                                    <FontAwesome5 name="user" size={16} color={COLORS.primary} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={styles.ownerName}>{vehicle.owner}</Text>
                                    <Text style={styles.ownerSub}>Premium Member</Text>
                                </View>
                                <TouchableOpacity style={styles.callBtn}>
                                    <MaterialIcons name="call" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Current Location</Text>
                        <View style={styles.card}>
                            <View style={styles.locationRow}>
                                <MaterialIcons name="location-pin" size={24} color={COLORS.primary} />
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={styles.lotName}>{vehicle.lot} Garage</Text>
                                    <Text style={styles.lotSub}>Level 2, Slot B24</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.paymentBtn}>
                        <Text style={styles.paymentBtnText}>Generate Invoice</Text>
                        <MaterialIcons name="receipt" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { height: 300, padding: 25, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    backBtn: { alignSelf: 'flex-start', padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    headerInfo: { alignItems: 'center', marginTop: 10 },
    vehicleIcon: { width: 90, height: 90, borderRadius: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    vehicleName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 15 },
    plateNumber: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5, letterSpacing: 2 },
    content: { padding: 25 },
    specsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -60, marginBottom: 30 },
    specBox: { width: (width - 70) / 3, backgroundColor: '#fff', padding: 15, borderRadius: 22, alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    specValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginTop: 8 },
    specLabel: { fontSize: 11, color: COLORS.textSub, marginTop: 2 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 22, padding: 20, elevation: 2 },
    ownerRow: { flexDirection: 'row', alignItems: 'center' },
    avatarMini: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
    ownerName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    ownerSub: { fontSize: 12, color: COLORS.textSub },
    callBtn: { backgroundColor: COLORS.success, padding: 10, borderRadius: 12 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    lotName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    lotSub: { fontSize: 12, color: COLORS.textSub },
    paymentBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    paymentBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 10 }
});

export default VehicleDetailsScreen;

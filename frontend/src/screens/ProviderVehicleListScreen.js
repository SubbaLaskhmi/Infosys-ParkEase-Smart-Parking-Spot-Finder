import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProviderVehicleListScreen = ({ navigation }) => {
    const vehicles = [
        { id: 1, type: 'Tesla Model X', owner: 'Rahul Kumar', plate: 'DL-9324', status: 'Charging', lot: 'City Center' },
        { id: 2, type: 'Honda Civic', owner: 'Amit Singh', plate: 'UP-0192', status: 'Parked', lot: 'Metro Plaza' },
        { id: 3, type: 'Toyota Prius', owner: 'Suresh Raina', plate: 'HR-2819', status: 'Parked', lot: 'City Center' },
        { id: 4, type: 'Nissan Leaf', owner: 'Priya Sharma', plate: 'MH-1022', status: 'Charging', lot: 'Metro Plaza' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Parked Vehicles</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <MaterialIcons name="filter-list" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {vehicles.map(vehicle => (
                    <TouchableOpacity
                        key={vehicle.id}
                        style={styles.vehicleCard}
                        onPress={() => navigation.navigate('VehicleDetails', { vehicle })}
                    >
                        <View style={styles.cardMain}>
                            <View style={[styles.statusIndicator, { backgroundColor: vehicle.status === 'Charging' ? COLORS.warning : COLORS.success }]} />
                            <View style={styles.info}>
                                <Text style={styles.vehicleType}>{vehicle.type}</Text>
                                <Text style={styles.ownerText}>{vehicle.owner} • {vehicle.plate}</Text>
                            </View>
                            <View style={styles.lotBadge}>
                                <MaterialIcons name="location-on" size={12} color={COLORS.primary} />
                                <Text style={styles.lotText}>{vehicle.lot}</Text>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.statusRow}>
                                <FontAwesome5
                                    name={vehicle.status === 'Charging' ? 'bolt' : 'parking'}
                                    size={12}
                                    color={vehicle.status === 'Charging' ? COLORS.warning : COLORS.success}
                                />
                                <Text style={[styles.statusLabel, { color: vehicle.status === 'Charging' ? COLORS.warning : COLORS.success }]}>
                                    {vehicle.status.toUpperCase()}
                                </Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color="#D1D5DB" />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    filterBtn: { padding: 8, backgroundColor: COLORS.primary + '10', borderRadius: 12 },
    content: { padding: 20 },
    vehicleCard: { backgroundColor: '#fff', borderRadius: 22, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    cardMain: { flexDirection: 'row', alignItems: 'center', padding: 18 },
    statusIndicator: { width: 4, height: 40, borderRadius: 2, marginRight: 15 },
    info: { flex: 1 },
    vehicleType: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    ownerText: { fontSize: 13, color: COLORS.textSub, marginTop: 4 },
    lotBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    lotText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, marginLeft: 4 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderTopWidth: 1, borderTopColor: '#F9FAFB' },
    statusRow: { flexDirection: 'row', alignItems: 'center' },
    statusLabel: { fontSize: 11, fontWeight: 'bold', marginLeft: 6 }
});

export default ProviderVehicleListScreen;

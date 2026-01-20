import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const ProviderParkingLotsScreen = ({ navigation }) => {
    const lots = [
        { id: 1, name: 'City Center Garage', address: '456 Mission St', spots: 120, active: 85, price: '₹5/hr' },
        { id: 2, name: 'Metro Plaza', address: '789 Post St', spots: 50, active: 42, price: '₹8/hr' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Parking Lots</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <MaterialIcons name="add-location" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {lots.map(lot => (
                    <TouchableOpacity key={lot.id} style={styles.lotCard}>
                        <View style={styles.lotHeader}>
                            <View style={styles.iconBox}>
                                <FontAwesome5 name="parking" size={24} color={COLORS.primary} />
                            </View>
                            <View style={styles.lotText}>
                                <Text style={styles.lotName}>{lot.name}</Text>
                                <Text style={styles.lotAddress}>{lot.address}</Text>
                            </View>
                            <Text style={styles.priceTag}>{lot.price}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.lotStats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Total Spots</Text>
                                <Text style={styles.statValue}>{lot.spots}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Occupied</Text>
                                <Text style={styles.statValue}>{lot.active}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Efficiency</Text>
                                <Text style={styles.statValue}>{Math.round((lot.active / lot.spots) * 100)}%</Text>
                            </View>
                        </View>

                        <View style={styles.progressBg}>
                            <View style={[styles.progressFill, { width: `${(lot.active / lot.spots) * 100}%` }]} />
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
    addBtn: { backgroundColor: COLORS.secondary, padding: 8, borderRadius: 12 },
    content: { padding: 20 },
    lotCard: { backgroundColor: '#fff', borderRadius: 25, padding: 20, marginBottom: 20, elevation: 3 },
    lotHeader: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 48, height: 48, borderRadius: 15, backgroundColor: COLORS.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    lotText: { flex: 1 },
    lotName: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    lotAddress: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
    priceTag: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
    lotStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    statItem: { alignItems: 'center' },
    statLabel: { fontSize: 11, color: COLORS.textSub, marginBottom: 4 },
    statValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    progressBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: COLORS.primary }
});

export default ProviderParkingLotsScreen;

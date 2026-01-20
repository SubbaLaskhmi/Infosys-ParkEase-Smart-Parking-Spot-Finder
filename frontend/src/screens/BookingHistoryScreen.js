import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const BookingHistoryScreen = ({ navigation }) => {
    const history = [
        { id: 1, lot: 'City Center Garage', date: 'Oct 24, 2024', duration: '2h 15m', amount: '₹50', status: 'Completed' },
        { id: 2, lot: 'Pier 39 Lot', date: 'Oct 20, 2024', duration: '1h 45m', amount: '₹30', status: 'Completed' },
        { id: 3, lot: 'Union Square', date: 'Oct 18, 2024', duration: '4h 00m', amount: '₹80', status: 'Completed' },
        { id: 4, lot: 'Market St Parking', date: 'Oct 12, 2024', duration: '1h 00m', amount: '₹20', status: 'Cancelled' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking History</Text>
                <TouchableOpacity style={styles.backBtn}>
                    <MaterialIcons name="filter-list" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {history.map((item) => (
                    <View key={item.id} style={styles.historyCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.lotInfo}>
                                <FontAwesome5 name="parking" size={20} color={COLORS.primary} />
                                <Text style={styles.lotName}>{item.lot}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Completed' ? '#D1FAE5' : '#FEE2E2' }]}>
                                <Text style={[styles.statusText, { color: item.status === 'Completed' ? COLORS.success : COLORS.error }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailsRow}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Date</Text>
                                <Text style={styles.detailValue}>{item.date}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Duration</Text>
                                <Text style={styles.detailValue}>{item.duration}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Amount</Text>
                                <Text style={styles.detailValue}>{item.amount}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.receiptBtn}>
                            <MaterialIcons name="receipt-long" size={18} color={COLORS.primary} />
                            <Text style={styles.receiptText}>Download Receipt</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: Platform.OS === 'ios' ? 20 : 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    content: { padding: 20 },
    historyCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    lotInfo: { flexDirection: 'row', alignItems: 'center' },
    lotName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 12 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 11, fontWeight: 'bold' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
    detailsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailItem: { flex: 1 },
    detailLabel: { fontSize: 12, color: COLORS.textSub, marginBottom: 4 },
    detailValue: { fontSize: 13, fontWeight: '700', color: COLORS.textMain },
    receiptBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.primary + '10' },
    receiptText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13, marginLeft: 8 }
});

export default BookingHistoryScreen;

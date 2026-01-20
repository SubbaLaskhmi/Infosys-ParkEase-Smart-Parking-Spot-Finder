import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const ProviderEarningsScreen = ({ navigation }) => {
    const weeklyData = [
        { day: 'Mon', amount: 1200 },
        { day: 'Tue', amount: 1500 },
        { day: 'Wed', amount: 900 },
        { day: 'Thu', amount: 2100 },
        { day: 'Fri', amount: 1800 },
        { day: 'Sat', amount: 2500 },
        { day: 'Sun', amount: 1400 },
    ];

    const transactions = [
        { id: 1, lot: 'City Center Garage', date: 'Today, 2:30 PM', amount: '+₹50', type: 'Credit' },
        { id: 2, lot: 'Metro Plaza', date: 'Today, 1:15 PM', amount: '+₹80', type: 'Credit' },
        { id: 3, lot: 'City Center Garage', date: 'Yesterday', amount: '+₹50', type: 'Credit' },
    ];

    const maxAmount = Math.max(...weeklyData.map(d => d.amount));

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[COLORS.success, '#059669']} style={styles.header}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Earnings</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Total Earnings</Text>
                    <Text style={styles.balanceAmount}>₹12,450.00</Text>
                    <View style={styles.trendBadge}>
                        <MaterialIcons name="trending-up" size={16} color="#fff" />
                        <Text style={styles.trendText}>+12.5% this month</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Weekly Analytics</Text>
                    <View style={styles.chartContainer}>
                        {weeklyData.map((d, i) => (
                            <View key={i} style={styles.chartBarContainer}>
                                <View style={[styles.chartBar, { height: (d.amount / maxAmount) * 100 }]} />
                                <Text style={styles.chartDay}>{d.day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Payouts</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>History</Text>
                    </TouchableOpacity>
                </View>

                {transactions.map(tx => (
                    <View key={tx.id} style={styles.txRow}>
                        <View style={styles.txIcon}>
                            <MaterialIcons name="account-balance-wallet" size={24} color={COLORS.success} />
                        </View>
                        <View style={styles.txInfo}>
                            <Text style={styles.txLot}>{tx.lot}</Text>
                            <Text style={styles.txDate}>{tx.date}</Text>
                        </View>
                        <Text style={styles.txAmount}>{tx.amount}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { padding: 25, paddingTop: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, height: 260 },
    nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    balanceContainer: { alignItems: 'center', marginTop: 20 },
    balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
    balanceAmount: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 8 },
    trendBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    trendText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
    content: { padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 25, elevation: 4 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 20 },
    chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
    chartBarContainer: { alignItems: 'center' },
    chartBar: { width: 12, backgroundColor: COLORS.success, borderRadius: 6 },
    chartDay: { fontSize: 10, color: COLORS.textSub, marginTop: 8 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    seeAll: { color: COLORS.primary, fontWeight: 'bold' },
    txRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 12, elevation: 2 },
    txIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    txInfo: { flex: 1 },
    txLot: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain },
    txDate: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
    txAmount: { fontSize: 16, fontWeight: 'bold', color: COLORS.success }
});

export default ProviderEarningsScreen;

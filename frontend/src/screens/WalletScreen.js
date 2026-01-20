import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const WalletScreen = ({ navigation }) => {
    const transactions = [
        { id: 1, type: 'Payment', spot: 'City Center Garage', date: 'Oct 24, 2024', amount: '-₹50', status: 'Completed' },
        { id: 2, type: 'Top-up', spot: 'Wallet Deposit', date: 'Oct 22, 2024', amount: '+₹500', status: 'Completed' },
        { id: 3, type: 'Payment', spot: 'Pier 39 Lot', date: 'Oct 20, 2024', amount: '-₹30', status: 'Completed' },
        { id: 4, type: 'Payment', spot: 'Union Square', date: 'Oct 18, 2024', amount: '-₹80', status: 'Completed' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Wallet</Text>
                    <TouchableOpacity style={styles.backBtn}>
                        <MaterialIcons name="help-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>₹842.50</Text>
                    <View style={styles.balanceActions}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <MaterialIcons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={styles.actionText}>Add Money</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.actionBtn}>
                            <MaterialIcons name="history" size={20} color="#fff" />
                            <Text style={styles.actionText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {transactions.map((tx) => (
                        <View key={tx.id} style={styles.txItem}>
                            <View style={[styles.txIcon, { backgroundColor: tx.type === 'Payment' ? '#FEE2E2' : '#D1FAE5' }]}>
                                <FontAwesome5
                                    name={tx.type === 'Payment' ? 'arrow-up' : 'arrow-down'}
                                    size={14}
                                    color={tx.type === 'Payment' ? COLORS.error : COLORS.success}
                                />
                            </View>
                            <View style={styles.txInfo}>
                                <Text style={styles.txTitle}>{tx.spot}</Text>
                                <Text style={styles.txDate}>{tx.date}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={[styles.txAmount, { color: tx.type === 'Payment' ? COLORS.error : COLORS.success }]}>
                                    {tx.amount}
                                </Text>
                                <Text style={styles.txStatus}>{tx.status}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { padding: 25, paddingTop: Platform.OS === 'ios' ? 20 : 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, height: 280 },
    navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    balanceCard: { alignItems: 'center' },
    balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' },
    balanceAmount: { color: '#fff', fontSize: 42, fontWeight: 'bold', marginVertical: 10 },
    balanceActions: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 10, marginTop: 10, alignItems: 'center' },
    actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 },
    actionText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 14 },
    divider: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 5 },
    content: { flex: 1, padding: 25, marginTop: -30 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
    txItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 20, marginBottom: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    txIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    txInfo: { flex: 1 },
    txTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    txDate: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
    txAmount: { fontSize: 16, fontWeight: 'bold' },
    txStatus: { fontSize: 10, color: COLORS.textSub, marginTop: 2, textTransform: 'uppercase', fontWeight: '600' }
});

export default WalletScreen;

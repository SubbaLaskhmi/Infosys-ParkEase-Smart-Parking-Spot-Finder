import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const ProviderDetailsScreen = ({ route, navigation }) => {
    const { provider } = route.params;

    const stats = [
        { label: 'Locations', value: provider.lots, icon: 'location-on', color: COLORS.primary },
        { label: 'EV Units', value: provider.centas, icon: 'bolt', color: COLORS.warning },
        { label: 'Revenue', value: '₹24k', icon: 'payments', color: COLORS.success },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={[COLORS.secondary, '#3730a3']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <View style={styles.providerAvatar}>
                            <MaterialIcons name="business" size={40} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <View style={styles.verifiedBadge}>
                            <MaterialIcons name="verified" size={16} color="#fff" />
                            <Text style={styles.verifiedText}>{provider.status.toUpperCase()}</Text>
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
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        <View style={styles.card}>
                            <View style={styles.infoItem}>
                                <MaterialIcons name="email" size={20} color={COLORS.textSub} />
                                <Text style={styles.infoText}>contact@{provider.name.toLowerCase().replace(' ', '')}.com</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoItem}>
                                <MaterialIcons name="phone" size={20} color={COLORS.textSub} />
                                <Text style={styles.infoText}>+91 98765 43210</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Lot Performance</Text>
                        <View style={styles.card}>
                            <View style={styles.performanceRow}>
                                <Text style={styles.perfLabel}>Booking Rate</Text>
                                <Text style={styles.perfValue}>82%</Text>
                            </View>
                            <View style={styles.progressBg}>
                                <View style={[styles.progressFill, { width: '82%', backgroundColor: COLORS.success }]} />
                            </View>
                            <View style={[styles.performanceRow, { marginTop: 15 }]}>
                                <Text style={styles.perfLabel}>User Rating</Text>
                                <Text style={styles.perfValue}>4.5/5</Text>
                            </View>
                            <View style={styles.progressBg}>
                                <View style={[styles.progressFill, { width: '90%', backgroundColor: COLORS.warning }]} />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>Suspend Provider</Text>
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
    providerAvatar: { width: 80, height: 80, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    providerName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 15 },
    verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 10 },
    verifiedText: { color: '#fff', fontSize: 10, fontWeight: 'bold', marginLeft: 6, letterSpacing: 1 },
    content: { padding: 25 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -60, marginBottom: 30 },
    statBox: { width: (width - 70) / 3, backgroundColor: '#fff', padding: 15, borderRadius: 22, alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    statIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    statLabel: { fontSize: 11, color: COLORS.textSub, marginTop: 2 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 22, padding: 20, elevation: 2 },
    infoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    infoText: { fontSize: 15, color: COLORS.textMain, marginLeft: 15 },
    divider: { height: 1, backgroundColor: '#F3F4F6' },
    performanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    perfLabel: { fontSize: 14, color: COLORS.textSub },
    perfValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },
    progressBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%' },
    actionBtn: { backgroundColor: '#FEE2E2', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10, borderColor: '#FCA5A5', borderWidth: 1 },
    actionBtnText: { color: COLORS.error, fontWeight: 'bold', fontSize: 16 }
});

export default ProviderDetailsScreen;

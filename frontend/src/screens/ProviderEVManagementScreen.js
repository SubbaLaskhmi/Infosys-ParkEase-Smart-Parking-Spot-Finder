import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Modal, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { showSuccess } from '../utils/alerts';

const ProviderEVManagementScreen = ({ navigation }) => {
    const [chargers, setChargers] = useState([
        { id: 'EV-01', type: 'Fast DC', status: 'In Use', load: '85%', health: 'Good' },
        { id: 'EV-02', type: 'AC Type 2', status: 'Available', load: '0%', health: 'Excellent' },
        { id: 'EV-03', type: 'Fast DC', status: 'Offline', load: '-', health: 'Needs Repair' },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newCharger, setNewCharger] = useState({
        type: 'Fast DC',
        status: 'Available',
        load: '0%',
        health: 'Excellent'
    });

    const handleAddCharger = () => {
        const newId = `EV-${String(chargers.length + 1).padStart(2, '0')}`;
        const charger = {
            id: newId,
            ...newCharger
        };
        setChargers([...chargers, charger]);
        setModalVisible(false);
        showSuccess(`Charger ${newId} added successfully!`);
        setNewCharger({
            type: 'Fast DC',
            status: 'Available',
            load: '0%',
            health: 'Excellent'
        });
    };

    const handleDeleteCharger = (chargerId) => {
        Alert.alert(
            'Delete Charger',
            `Are you sure you want to delete ${chargerId}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setChargers(chargers.filter(c => c.id !== chargerId));
                        showSuccess(`${chargerId} deleted successfully!`);
                    }
                }
            ]
        );
    };

    const handleManageStation = (charger) => {
        Alert.alert(
            `Manage ${charger.id}`,
            `Type: ${charger.type}\nStatus: ${charger.status}\nHealth: ${charger.health}`,
            [
                {
                    text: 'Mark Offline',
                    onPress: () => {
                        const updated = chargers.map(c =>
                            c.id === charger.id ? { ...c, status: 'Offline', load: '-' } : c
                        );
                        setChargers(updated);
                        showSuccess(`${charger.id} marked as offline`);
                    }
                },
                {
                    text: 'Mark Available',
                    onPress: () => {
                        const updated = chargers.map(c =>
                            c.id === charger.id ? { ...c, status: 'Available', load: '0%' } : c
                        );
                        setChargers(updated);
                        showSuccess(`${charger.id} is now available`);
                    }
                },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const activeChargers = chargers.filter(c => c.status !== 'Offline').length;
    const totalLoad = chargers.reduce((sum, c) => {
        const load = parseInt(c.load);
        return sum + (isNaN(load) ? 0 : load);
    }, 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>EV Management</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.summaryCard}>
                    <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.summaryGradient}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{activeChargers} Active</Text>
                            <Text style={styles.summaryLabel}>Total Chargers</Text>
                        </View>
                        <View style={styles.vDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{totalLoad} kWh</Text>
                            <Text style={styles.summaryLabel}>Today's Load</Text>
                        </View>
                    </LinearGradient>
                </View>

                {chargers.map(charger => (
                    <View key={charger.id} style={styles.chargerCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.idContainer}>
                                <Ionicons name="flash" size={20} color={COLORS.warning} />
                                <Text style={styles.chargerId}>{charger.id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.statusBadge, { backgroundColor: charger.status === 'Available' ? '#D1FAE5' : (charger.status === 'In Use' ? '#DBEAFE' : '#FEE2E2') }]}>
                                    <Text style={[styles.statusText, { color: charger.status === 'Available' ? COLORS.success : (charger.status === 'In Use' ? '#1E40AF' : COLORS.error) }]}>
                                        {charger.status}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleDeleteCharger(charger.id)}
                                    style={styles.deleteBtn}
                                >
                                    <MaterialIcons name="delete" size={20} color={COLORS.error} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Type</Text>
                                <Text style={styles.detailValue}>{charger.type}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Current Load</Text>
                                <Text style={styles.detailValue}>{charger.load}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>System Health</Text>
                                <Text style={styles.detailValue}>{charger.health}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.manageBtn}
                            onPress={() => handleManageStation(charger)}
                        >
                            <Text style={styles.manageBtnText}>Manage Station</Text>
                            <MaterialIcons name="settings" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Charger</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color={COLORS.textMain} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Charger Type</Text>
                            <View style={styles.typeOptions}>
                                <TouchableOpacity
                                    style={[styles.typeBtn, newCharger.type === 'Fast DC' && styles.typeBtnActive]}
                                    onPress={() => setNewCharger({ ...newCharger, type: 'Fast DC' })}
                                >
                                    <Text style={[styles.typeText, newCharger.type === 'Fast DC' && styles.typeTextActive]}>Fast DC</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.typeBtn, newCharger.type === 'AC Type 2' && styles.typeBtnActive]}
                                    onPress={() => setNewCharger({ ...newCharger, type: 'AC Type 2' })}
                                >
                                    <Text style={[styles.typeText, newCharger.type === 'AC Type 2' && styles.typeTextActive]}>AC Type 2</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.addChargerBtn} onPress={handleAddCharger}>
                            <Text style={styles.addChargerBtnText}>Add Charger</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    addBtn: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 12 },
    content: { padding: 20 },
    summaryCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 25, elevation: 8 },
    summaryGradient: { flexDirection: 'row', padding: 25, alignItems: 'center' },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
    vDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
    chargerCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    idContainer: { flexDirection: 'row', alignItems: 'center' },
    chargerId: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 10 },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    statusText: { fontSize: 12, fontWeight: '800' },
    deleteBtn: { marginLeft: 12, padding: 8, backgroundColor: COLORS.error + '15', borderRadius: 8 },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 15 },
    detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
    detailItem: { width: '45%' },
    detailLabel: { fontSize: 12, color: COLORS.textSub, marginBottom: 4 },
    detailValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },
    manageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary + '10', marginTop: 20, padding: 12, borderRadius: 12 },
    manageBtnText: { color: COLORS.primary, fontWeight: 'bold', marginRight: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 40 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    formGroup: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 12 },
    typeOptions: { flexDirection: 'row', gap: 12 },
    typeBtn: { flex: 1, paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
    typeBtnActive: { backgroundColor: COLORS.primary + '15', borderColor: COLORS.primary },
    typeText: { fontSize: 14, fontWeight: '600', color: COLORS.textSub },
    typeTextActive: { color: COLORS.primary, fontWeight: 'bold' },
    addChargerBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
    addChargerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default ProviderEVManagementScreen;

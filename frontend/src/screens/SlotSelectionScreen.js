import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import GradientButton from '../components/GradientButton';
import { showSuccess } from '../utils/alerts';

const { width } = Dimensions.get('window');

const SlotSelectionScreen = ({ route, navigation }) => {
    const { parkingName, address, rate } = route.params;
    const [selectedSlot, setSelectedSlot] = useState(null);

    const slots = [
        { id: 'A1', status: 'available', price: 50 },
        { id: 'A2', status: 'booked', price: 50 },
        { id: 'A3', status: 'available', price: 50 },
        { id: 'A4', status: 'available', price: 50 },
        { id: 'B1', status: 'booked', price: 60 },
        { id: 'B2', status: 'available', price: 60 },
        { id: 'B3', status: 'available', price: 60 },
        { id: 'B4', status: 'booked', price: 60 },
        { id: 'C1', status: 'available', price: 40 },
        { id: 'C2', status: 'available', price: 40 },
        { id: 'C3', status: 'available', price: 40 },
        { id: 'C4', status: 'available', price: 40 },
    ];

    const handleBooking = () => {
        if (!selectedSlot) return alert('Please select a spot');
        showSuccess('Success', `Spot ${selectedSlot} booked successfully for ${parkingName}!`);
        navigation.goBack();
    };

    const renderSlot = (slot) => {
        const isSelected = selectedSlot === slot.id;
        const isBooked = slot.status === 'booked';

        return (
            <TouchableOpacity
                key={slot.id}
                disabled={isBooked}
                onPress={() => setSelectedSlot(slot.id)}
                style={[
                    styles.slot,
                    isBooked && styles.slotBooked,
                    isSelected && styles.slotSelected
                ]}
            >
                <FontAwesome5
                    name="car"
                    size={20}
                    color={isBooked ? '#D1D5DB' : (isSelected ? '#fff' : COLORS.primary)}
                />
                <Text style={[
                    styles.slotId,
                    isBooked && styles.slotIdBooked,
                    isSelected && styles.slotIdSelected
                ]}>
                    {slot.id}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={styles.headerTitle}>{parkingName}</Text>
                        <Text style={styles.headerSubtitle}>{address}</Text>
                    </View>
                </View>

                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#fff' }]} />
                        <Text style={styles.legendText}>Available</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#D1FAE5', borderColor: COLORS.success, borderWidth: 1 }]} />
                        <Text style={styles.legendText}>Selected</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#F3F4F6' }]} />
                        <Text style={styles.legendText}>Booked</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.floorPlan}>
                        <View style={styles.road}>
                            <Text style={styles.roadText}>ENTRANCE</Text>
                        </View>

                        <View style={styles.slotsGrid}>
                            {slots.map(renderSlot)}
                        </View>

                        <View style={styles.road}>
                            <Text style={styles.roadText}>EXIT</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerInfo}>
                    <View>
                        <Text style={styles.footerLabel}>Selected Spot</Text>
                        <Text style={styles.footerValue}>{selectedSlot || 'None'}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.footerLabel}>Total Rate</Text>
                        <Text style={styles.footerPrice}>₹{selectedSlot ? '50' : '0'}</Text>
                    </View>
                </View>
                <GradientButton title="Confirm Booking" onPress={handleBooking} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { padding: 25, paddingTop: Platform.OS === 'ios' ? 20 : 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    headerContent: { flexDirection: 'row', alignItems: 'center' },
    backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
    legend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
    legendItem: { flexDirection: 'row', alignItems: 'center' },
    legendBox: { width: 14, height: 14, borderRadius: 4, marginRight: 8 },
    legendText: { color: '#fff', fontSize: 12, fontWeight: '500' },
    content: { flex: 1, padding: 20 },
    floorPlan: { backgroundColor: '#fff', borderRadius: 24, padding: 20, minHeight: 400, borderColor: '#E5E7EB', borderWidth: 1 },
    road: { height: 40, backgroundColor: '#F9FAFB', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
    roadText: { fontSize: 10, color: '#9CA3AF', fontWeight: 'bold', letterSpacing: 2 },
    slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    slot: { width: (width - 120) / 3, height: 80, backgroundColor: '#fff', borderRadius: 12, borderWidth: 2, borderColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
    slotBooked: { backgroundColor: '#F3F4F6', borderColor: '#F3F4F6' },
    slotSelected: { backgroundColor: COLORS.success, borderColor: COLORS.success },
    slotId: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain, marginTop: 4 },
    slotIdBooked: { color: '#9CA3AF' },
    slotIdSelected: { color: '#fff' },
    footer: { backgroundColor: '#fff', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 20 },
    footerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    footerLabel: { fontSize: 12, color: COLORS.textSub },
    footerValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    footerPrice: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary }
});

export default SlotSelectionScreen;

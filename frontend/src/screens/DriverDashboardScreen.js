import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, SafeAreaView, Modal, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import GradientButton from '../components/GradientButton';
import MenuModal from '../components/MenuModal';
import { COLORS } from '../constants/colors';
import { showSuccess } from '../utils/alerts';

// --- CONDITIONAL MAP IMPORT FOR WEB STABILITY ---
// let MapView, Marker;
const IsWeb = Platform.OS === 'web';

// if (!IsWeb) {
//     try {
//         const Maps = require('react-native-maps');
//         MapView = Maps.default;
//         Marker = Maps.Marker;
//     } catch (e) {
//         console.warn("Maps module failed to load", e);
//     }
// }
const MapView = null;
const Marker = null;

const DriverDashboardScreen = ({ navigation }) => {
    const [source, setSource] = useState('Current Location');
    const [dest, setDest] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [evModalVisible, setEvModalVisible] = useState(false);

    // EV Charging Slots Data
    const evSlots = [
        { id: 'EV-01', status: 'Charging', time: '45m left', car: 'Tesla X' },
        { id: 'EV-02', status: 'Available', time: '-', car: '-' },
        { id: 'EV-03', status: 'Charging', time: '12m left', car: 'Nissan Leaf' },
        { id: 'EV-04', status: 'Maintenance', time: 'Indefinite', car: '-' },
    ];

    // Mock Current User Location
    const userLocation = {
        latitude: 37.78825,
        longitude: -122.4324,
        address: '123 Market St, San Francisco, CA'
    };

    const [region, setRegion] = useState({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const menuItems = [
        { label: 'Profile', icon: 'user-astronaut', color: COLORS.primary },
        { label: 'My Wallet', icon: 'wallet', color: COLORS.success, nav: 'Wallet' },
        { label: 'Booking History', icon: 'history', color: COLORS.warning, nav: 'BookingHistory' },
        { label: 'Saved Places', icon: 'bookmark', color: COLORS.accent, nav: 'SavedPlaces' },
        { label: 'Settings', icon: 'cog', color: COLORS.textSub, nav: 'DriverSettings' },
        { label: 'Logout', icon: 'sign-out-alt', color: COLORS.error }
    ];

    const parkingSpots = [
        { id: 1, title: 'City Center Garage', lat: 37.75825, long: -122.4624, price: '₹5/hr', status: 'Available', address: '456 Mission St' },
        { id: 2, title: 'Union Square Parking', lat: 37.79825, long: -122.4024, price: '₹8/hr', status: 'Full', address: '789 Post St' },
        { id: 3, title: 'Pier 39 Lot', lat: 37.8086, long: -122.4098, price: '₹10/hr', status: 'Available', address: 'Beach St & The Embarcadero' },
    ];

    const handleSpotPress = (spot) => {
        setSelectedSpot(spot);
    };

    return (
        <View style={styles.container}>
            {IsWeb || !MapView ? (
                <View style={styles.webFallback}>
                    <FontAwesome5 name="map-marked-alt" size={64} color={COLORS.primary} style={{ opacity: 0.5 }} />
                    <Text style={styles.webFallbackText}>Interactive Map Unavailable on Web</Text>
                </View>
            ) : (
                <MapView style={StyleSheet.absoluteFillObject} region={region} onPress={() => setSelectedSpot(null)}>
                    <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} title="You are here" pinColor={COLORS.primary}>
                        <View style={styles.userMarkerContainer}>
                            <View style={styles.userMarkerPulse} />
                            <View style={styles.userMarkerInner} />
                        </View>
                    </Marker>

                    {parkingSpots.map(spot => (
                        <Marker
                            key={spot.id}
                            coordinate={{ latitude: spot.lat, longitude: spot.long }}
                            title={spot.title}
                            onPress={() => handleSpotPress(spot)}
                        >
                            <View style={[styles.spotMarker, { backgroundColor: spot.status === 'Full' ? COLORS.error : COLORS.success }]}>
                                <FontAwesome5 name="parking" size={14} color="#fff" />
                            </View>
                        </Marker>
                    ))}
                </MapView>
            )}

            <SafeAreaView style={[styles.headerOverlay, { top: Platform.OS === 'android' ? 40 : 10 }]} pointerEvents="box-none">
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => setMenuVisible(true)}>
                        <MaterialIcons name="menu" size={28} color={COLORS.textMain} />
                    </TouchableOpacity>
                    <View style={styles.locationBar}>
                        <View style={styles.locationStatus}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Current Location</Text>
                        </View>
                        <Text style={styles.addressText} numberOfLines={1}>{userLocation.address}</Text>
                    </View>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => setEvModalVisible(true)}>
                        <MaterialIcons name="ev-station" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <MenuModal
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                menuItems={menuItems}
                userRole="Driver"
                navigation={navigation}
            />

            {!selectedSpot && (
                <SafeAreaView pointerEvents="box-none" style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color={COLORS.textSub} style={{ marginRight: 10 }} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Where to park?"
                            value={dest}
                            onChangeText={setDest}
                        />
                    </View>
                </SafeAreaView>
            )}

            {selectedSpot && (
                <View style={styles.detailCard}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedSpot(null)}>
                        <MaterialIcons name="close" size={20} color={COLORS.textSub} />
                    </TouchableOpacity>
                    <View style={styles.detailRow}>
                        <View>
                            <Text style={styles.detailTitle}>{selectedSpot.title}</Text>
                            <Text style={styles.detailSubtitle}>{selectedSpot.address}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: selectedSpot.status === 'Full' ? '#FEE2E2' : '#D1FAE5' }]}>
                                <Text style={[styles.statusBadgeText, { color: selectedSpot.status === 'Full' ? COLORS.error : COLORS.success }]}>
                                    {selectedSpot.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.priceText}>{selectedSpot.price}</Text>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.secondaryBtn}>
                            <FontAwesome5 name="directions" size={16} color={COLORS.primary} />
                            <Text style={styles.secondaryBtnText}>Directions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.primaryBtn, { opacity: selectedSpot.status === 'Full' ? 0.5 : 1 }]}
                            disabled={selectedSpot.status === 'Full'}
                            onPress={() => navigation.navigate('SlotSelection', {
                                parkingName: selectedSpot.title,
                                address: selectedSpot.address,
                                rate: selectedSpot.price
                            })}
                        >
                            <Text style={styles.primaryBtnText}>{selectedSpot.status === 'Full' ? 'FULL' : 'VIEW SLOTS'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={evModalVisible}
                onRequestClose={() => setEvModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>EV Charging Status</Text>
                            <TouchableOpacity onPress={() => setEvModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color={COLORS.textMain} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ marginTop: 10 }}>
                            {evSlots.map((slot, i) => (
                                <View key={i} style={styles.evSlotItem}>
                                    <View style={styles.evSlotLeft}>
                                        <MaterialIcons name="ev-station" size={28} color={slot.status === 'Available' ? COLORS.success : COLORS.textSub} />
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.evSlotId}>{slot.id}</Text>
                                            <Text style={styles.evSlotStatus}>{slot.car !== '-' ? "Occupied" : 'Available'}</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'end' }}>
                                        <View style={[styles.evBadge, { backgroundColor: slot.status === 'Charging' ? '#DBEAFE' : slot.status === 'Available' ? '#D1FAE5' : '#F3F4F6' }]}>
                                            <Text style={[styles.evBadgeText, { color: slot.status === 'Charging' ? '#1E40AF' : slot.status === 'Available' ? '#065F46' : '#6B7280' }]}>
                                                {slot.status}
                                            </Text>
                                        </View>
                                        <Text style={styles.evTimeText}>{slot.time !== '-' ? slot.time : 'Ready'}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    webFallback: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEF2FF' },
    webFallbackText: { marginTop: 20, color: COLORS.textMain, fontSize: 18, fontWeight: '600' },
    userMarkerContainer: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(79, 70, 229, 0.3)', alignItems: 'center', justifyContent: 'center' },
    userMarkerInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.primary, borderColor: '#fff', borderWidth: 2 },
    userMarkerPulse: { position: 'absolute', width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.primary, opacity: 0.2 },
    spotMarker: { padding: 8, borderRadius: 10, borderWidth: 2, borderColor: '#fff', elevation: 4 },
    headerOverlay: { position: 'absolute', left: 0, right: 0, zIndex: 10 },
    headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    iconBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 12, elevation: 5 },
    locationBar: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 12, elevation: 5, marginHorizontal: 12 },
    locationStatus: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 6 },
    statusText: { fontSize: 10, color: COLORS.textSub, fontWeight: '600', textTransform: 'uppercase' },
    addressText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain, marginTop: 2 },
    searchContainer: { flex: 1, justifyContent: 'flex-start' },
    searchBar: { marginTop: 100, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 4, elevation: 5 },
    searchInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
    detailCard: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 10 },
    closeBtn: { position: 'absolute', top: 10, right: 10, padding: 6, zIndex: 10 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    detailTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    detailSubtitle: { fontSize: 13, color: COLORS.textSub, marginTop: 2, marginRight: 20 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8 },
    statusBadgeText: { fontWeight: 'bold', fontSize: 12 },
    priceText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
    actionRow: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
    secondaryBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', padding: 14, borderRadius: 12, marginRight: 12 },
    secondaryBtnText: { color: COLORS.textMain, fontWeight: '600', marginLeft: 8 },
    primaryBtn: { flex: 2, backgroundColor: COLORS.primary, padding: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, maxHeight: '60%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    evSlotItem: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
    evSlotLeft: { flexDirection: 'row', alignItems: 'center' },
    evSlotId: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    evSlotStatus: { fontSize: 13, color: COLORS.textSub },
    evBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4, alignSelf: 'flex-end' },
    evBadgeText: { fontSize: 11, fontWeight: 'bold' },
    evTimeText: { fontSize: 12, color: COLORS.textSub, fontWeight: '600' }
});

export default DriverDashboardScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const SavedPlacesScreen = ({ navigation }) => {
    const places = [
        { id: 1, name: 'Office Garage', address: '123 Business Way', lastUsed: 'Yesterday', icon: 'work' },
        { id: 2, name: 'Home Parking', address: '789 Residential Ln', lastUsed: '2 days ago', icon: 'home' },
        { id: 3, name: 'Downtown Gym', address: '456 Fitness Ave', lastUsed: '1 week ago', icon: 'fitness-center' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Places</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <MaterialIcons name="add-location-alt" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {places.map((place) => (
                    <TouchableOpacity key={place.id} style={styles.placeCard}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name={place.icon} size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.placeInfo}>
                            <Text style={styles.placeName}>{place.name}</Text>
                            <Text style={styles.placeAddress}>{place.address}</Text>
                            <Text style={styles.lastUsed}>Last used: {place.lastUsed}</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteBtn}>
                            <MaterialIcons name="more-vert" size={24} color="#D1D5DB" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: Platform.OS === 'ios' ? 20 : 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    addBtn: { backgroundColor: COLORS.secondary, padding: 8, borderRadius: 12, elevation: 5 },
    content: { padding: 20 },
    placeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 24, marginBottom: 15, elevation: 2 },
    iconBox: { width: 50, height: 50, borderRadius: 16, backgroundColor: COLORS.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    placeInfo: { flex: 1 },
    placeName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    placeAddress: { fontSize: 13, color: COLORS.textSub, marginTop: 2 },
    lastUsed: { fontSize: 11, color: COLORS.textSub, marginTop: 4, fontStyle: 'italic' },
    deleteBtn: { padding: 5 }
});

export default SavedPlacesScreen;

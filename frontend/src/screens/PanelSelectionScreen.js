import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const PanelSelectionScreen = ({ navigation }) => {
    const panels = [
        { id: 'Driver', title: 'I am a Driver', sub: 'Find and book parking spots', icon: 'car', color: COLORS.primary, nav: 'DriverLogin' },
        { id: 'Provider', title: 'I am a Provider', sub: 'Manage your parking spaces', icon: 'parking', color: COLORS.secondary, nav: 'ProviderLogin' },
        { id: 'Admin', title: 'I am an Admin', sub: 'Oversee system operations', icon: 'user-shield', color: COLORS.accent, nav: 'AdminLogin' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.brand}>ParkEase</Text>
                    <Text style={styles.title}>Welcome back</Text>
                    <Text style={styles.subtitle}>Select your portal to continue</Text>
                </View>

                <View style={styles.panelList}>
                    {panels.map((panel) => (
                        <TouchableOpacity
                            key={panel.id}
                            style={styles.card}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate(panel.nav)}
                        >
                            <LinearGradient
                                colors={[panel.color, panel.color + 'DD']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.cardContent}>
                                    <View style={styles.iconContainer}>
                                        <FontAwesome5 name={panel.icon} size={28} color="#fff" />
                                    </View>
                                    <View style={styles.cardText}>
                                        <Text style={styles.cardTitle}>{panel.title}</Text>
                                        <Text style={styles.cardSubtitle}>{panel.sub}</Text>
                                    </View>
                                    <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" style={{ opacity: 0.8 }} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Secure smart parking solution</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { flex: 1, padding: 25, justifyContent: 'center' },
    header: { marginBottom: 40 },
    brand: { fontSize: 14, fontWeight: '800', color: COLORS.primary, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
    title: { fontSize: 32, fontWeight: 'bold', color: COLORS.textMain },
    subtitle: { fontSize: 16, color: COLORS.textSub, marginTop: 4 },
    panelList: { gap: 15 },
    card: { borderRadius: 24, overflow: 'hidden', height: 110, elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10 },
    cardGradient: { flex: 1 },
    cardContent: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20 },
    iconContainer: { width: 56, height: 56, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    cardText: { flex: 1 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    cardSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
    footer: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' },
    footerText: { fontSize: 12, color: COLORS.textSub, opacity: 0.6, fontWeight: '600' },
});

export default PanelSelectionScreen;

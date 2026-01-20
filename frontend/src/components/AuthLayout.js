import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const AuthLayout = ({ children, title, subtitle, onBack }) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                {onBack && (
                    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                )}
                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { height: 260, borderBottomLeftRadius: 50, padding: 30, paddingTop: 60, justifyContent: 'flex-start' },
    backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    headerTextContainer: { marginTop: 10 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
    subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
    keyboardView: { flex: 1, marginTop: -60 },
    scrollContent: { paddingHorizontal: 25 },
    card: { backgroundColor: '#fff', borderRadius: 30, padding: 30, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10, marginBottom: 30 },
});

export default AuthLayout;

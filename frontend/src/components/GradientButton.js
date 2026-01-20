import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const GradientButton = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, style]}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', height: 55, borderRadius: 15, overflow: 'hidden', marginVertical: 10 },
    gradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default GradientButton;

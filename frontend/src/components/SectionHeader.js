import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const SectionHeader = ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
    </View>
);

const styles = StyleSheet.create({
    container: { marginBottom: 16, marginTop: 8 },
    title: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
    line: { marginTop: 4, width: 30, height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
});

export default SectionHeader;

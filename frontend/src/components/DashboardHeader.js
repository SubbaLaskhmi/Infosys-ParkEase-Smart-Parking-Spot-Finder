import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const DashboardHeader = ({ title, userRole, onMenuPress, onNotificationPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
                    <MaterialIcons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.welcomeText}>ParkEase</Text>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <TouchableOpacity onPress={onNotificationPress} style={styles.iconBtn}>
                    <View style={styles.badge} />
                    <MaterialIcons name="notifications-none" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.userCard}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <FontAwesome5 name="user-astronaut" size={24} color={COLORS.primary} />
                    </View>
                    <View>
                        <Text style={styles.roleText}>{userRole}</Text>
                        <Text style={styles.statusText}>Online</Text>
                    </View>
                </View>
                <View style={[styles.statusIndicator, { backgroundColor: COLORS.success }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBtn: {
        padding: 8,
    },
    titleContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.error,
        borderWidth: 2,
        borderColor: COLORS.primary,
        zIndex: 1,
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    roleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    statusText: {
        fontSize: 12,
        color: COLORS.success,
        fontWeight: '600',
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

export default DashboardHeader;

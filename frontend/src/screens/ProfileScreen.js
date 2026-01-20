import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ route, navigation }) => {
    const { role } = route.params || { role: 'Driver' };

    const menuItems = [
        { id: 1, label: 'Edit Profile', icon: 'person-outline', color: COLORS.primary },
        { id: 2, label: 'Notifications', icon: 'notifications-none', color: COLORS.warning },
        { id: 3, label: 'Security', icon: 'security', color: COLORS.success },
        { id: 4, label: 'Help Center', icon: 'help-outline', color: COLORS.accent },
        { id: 5, label: 'About App', icon: 'info-outline', color: COLORS.textSub },
    ];

    const stats = [
        { label: 'Bookings', value: '142', icon: 'local-parking' },
        { label: 'Rating', value: '4.8', icon: 'star-outline' },
        { label: 'Saved', value: '12', icon: 'bookmark-outline' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[COLORS.primary, '#4338ca']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <FontAwesome5 name="user-astronaut" size={50} color={COLORS.primary} />
                        <TouchableOpacity style={styles.editBtn}>
                            <MaterialIcons name="edit" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>Mayank Shrivastava</Text>
                    <Text style={styles.email}>mayank@pro.com</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{role.toUpperCase()} PORTAL</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.statsContainer}>
                {stats.map((stat, i) => (
                    <View key={i} style={styles.statBox}>
                        <MaterialIcons name={stat.icon} size={24} color={COLORS.primary} />
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.menuList} showsVerticalScrollIndicator={false}>
                {menuItems.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                            <MaterialIcons name={item.icon} size={24} color={item.color} />
                        </View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'PanelSelection' }] })}
                >
                    <MaterialIcons name="logout" size={24} color={COLORS.error} />
                    <Text style={styles.logoutText}>Logout from Account</Text>
                </TouchableOpacity>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { height: 320, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 30, paddingTop: 60, alignItems: 'center' },
    backBtn: { alignSelf: 'flex-start', padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    profileInfo: { alignItems: 'center', marginTop: 10 },
    avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    editBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.secondary, padding: 6, borderRadius: 15, borderColor: '#fff', borderWidth: 2 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 15 },
    email: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
    roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, marginTop: 10 },
    roleText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    statsContainer: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 30, marginTop: -40, borderRadius: 25, padding: 20, elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15 },
    statBox: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginTop: 4 },
    statLabel: { fontSize: 12, color: COLORS.textSub },
    menuList: { padding: 30, paddingTop: 30 },
    menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    menuIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, padding: 20, borderRadius: 20, backgroundColor: '#FEE2E2', borderColor: '#FCA5A5', borderWidth: 1 },
    logoutText: { color: COLORS.error, fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});

export default ProfileScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { showSuccess } from '../utils/alerts';

const ProviderSettingsScreen = ({ navigation }) => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [autoAccept, setAutoAccept] = useState(false);
    const [accountSuspended, setAccountSuspended] = useState(false);

    const handleProfileDetails = () => {
        navigation.navigate('Profile', { role: 'Provider' });
    };

    const handleBusinessVerification = () => {
        Alert.alert(
            'Business Verification',
            'Your business is verified ✓\n\nBusiness Name: ParkEase Solutions\nRegistration: REG-2024-001\nStatus: Active',
            [{ text: 'OK' }]
        );
    };

    const handleManageLocations = () => {
        showSuccess('Manage Locations feature coming soon!');
    };

    const handlePushNotifications = (value) => {
        setPushEnabled(value);
        showSuccess(value ? 'Push notifications enabled' : 'Push notifications disabled');
    };

    const handleAutoAccept = (value) => {
        setAutoAccept(value);
        showSuccess(value ? 'Auto-accept bookings enabled' : 'Auto-accept bookings disabled');
    };

    const handleHelp = () => {
        Alert.alert(
            'Help & FAQ',
            'How can we help you?\n\n• Managing parking spots\n• EV charging setup\n• Payment issues\n• Booking management\n• Account settings\n\nContact: support@parkease.com\nPhone: +91-1800-PARK-EASE',
            [{ text: 'OK' }]
        );
    };

    const handlePrivacyPolicy = () => {
        Alert.alert(
            'Privacy Policy',
            'ParkEase Privacy Policy v1.0\n\nWe value your privacy and are committed to protecting your personal information.\n\nKey Points:\n• Data encryption\n• Secure transactions\n• No third-party sharing\n• GDPR compliant\n\nLast updated: January 2026',
            [{ text: 'OK' }]
        );
    };

    const handleSuspendAccount = () => {
        Alert.alert(
            accountSuspended ? 'Activate Account' : 'Suspend Account',
            accountSuspended
                ? 'Are you sure you want to activate your account? You will start receiving bookings again.'
                : 'Are you sure you want to suspend your account? You will not receive any new bookings during suspension.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: accountSuspended ? 'Activate' : 'Suspend',
                    style: accountSuspended ? 'default' : 'destructive',
                    onPress: () => {
                        setAccountSuspended(!accountSuspended);
                        showSuccess(accountSuspended ? 'Account activated successfully' : 'Account suspended successfully');
                    }
                }
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            '⚠️ This action cannot be undone!\n\nDeleting your account will:\n• Remove all your parking spots\n• Cancel active bookings\n• Delete all your data\n• Close your business account\n\nAre you absolutely sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert(
                            'Final Confirmation',
                            'Type "DELETE" to confirm this action',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Yes, Delete My Account',
                                    style: 'destructive',
                                    onPress: () => {
                                        showSuccess('Account deletion requested. You will receive a confirmation email.');
                                        setTimeout(() => {
                                            navigation.reset({ index: 0, routes: [{ name: 'PanelSelection' }] });
                                        }, 2000);
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    };

    const sections = [
        {
            title: 'Account Settings',
            items: [
                { id: 1, label: 'Profile Details', icon: 'person', color: COLORS.primary, onPress: handleProfileDetails },
                { id: 2, label: 'Business Verification', icon: 'verified-user', color: COLORS.success, onPress: handleBusinessVerification },
                { id: 3, label: 'Manage Locations', icon: 'map', color: COLORS.accent, onPress: handleManageLocations },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { id: 4, label: 'Push Notifications', icon: 'notifications', color: COLORS.warning, toggle: true, value: pushEnabled, onValueChange: handlePushNotifications },
                { id: 5, label: 'Auto-accept Bookings', icon: 'auto-awesome', color: '#8B5CF6', toggle: true, value: autoAccept, onValueChange: handleAutoAccept },
            ]
        },
        {
            title: 'Support',
            items: [
                { id: 6, label: 'Help & FAQ', icon: 'help', color: COLORS.textSub, onPress: handleHelp },
                { id: 7, label: 'Privacy Policy', icon: 'description', color: COLORS.textSub, onPress: handlePrivacyPolicy },
            ]
        },
        {
            title: 'Account Actions',
            items: [
                { id: 8, label: accountSuspended ? 'Activate Account' : 'Suspend Account', icon: accountSuspended ? 'play-circle' : 'pause-circle', color: COLORS.warning, onPress: handleSuspendAccount },
                { id: 9, label: 'Delete Account', icon: 'delete-forever', color: COLORS.error, onPress: handleDeleteAccount },
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {accountSuspended && (
                    <View style={styles.warningBanner}>
                        <MaterialIcons name="warning" size={24} color={COLORS.warning} />
                        <Text style={styles.warningText}>Your account is currently suspended</Text>
                    </View>
                )}

                {sections.map((section, idx) => (
                    <View key={idx} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.card}>
                            {section.items.map((item, i) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={styles.item}
                                        disabled={item.toggle}
                                        onPress={item.onPress}
                                    >
                                        <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                                            <MaterialIcons name={item.icon} size={22} color={item.color} />
                                        </View>
                                        <Text style={styles.itemLabel}>{item.label}</Text>
                                        {item.toggle ? (
                                            <Switch
                                                value={item.value}
                                                onValueChange={item.onValueChange}
                                                trackColor={{ false: '#E5E7EB', true: COLORS.primary + '80' }}
                                                thumbColor={item.value ? COLORS.primary : '#F3F4F6'}
                                            />
                                        ) : (
                                            <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
                                        )}
                                    </TouchableOpacity>
                                    {i < section.items.length - 1 && <View style={styles.divider} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        Alert.alert(
                            'Logout',
                            'Are you sure you want to logout?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Logout',
                                    style: 'destructive',
                                    onPress: () => navigation.reset({ index: 0, routes: [{ name: 'PanelSelection' }] })
                                }
                            ]
                        );
                    }}
                >
                    <MaterialIcons name="logout" size={24} color={COLORS.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    content: { padding: 20 },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.warning + '20',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.warning + '40',
    },
    warningText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.warning,
        marginLeft: 12,
    },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.textSub, textTransform: 'uppercase', marginBottom: 12, marginLeft: 5 },
    card: { backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden', elevation: 2 },
    item: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    iconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    itemLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginTop: 16,
        borderWidth: 2,
        borderColor: COLORS.error + '30',
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.error,
        marginLeft: 10,
    },
});

export default ProviderSettingsScreen;

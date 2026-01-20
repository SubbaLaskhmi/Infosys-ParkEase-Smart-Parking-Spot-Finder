import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DashboardHeader from '../components/DashboardHeader';
import { COLORS } from '../constants/colors';
import { showSuccess } from '../utils/alerts';

const DriverSettingsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(true);
    const [locationSharing, setLocationSharing] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoBook, setAutoBook] = useState(false);

    const settingsSections = [
        {
            title: 'General',
            items: [
                {
                    icon: 'notifications',
                    iconLib: 'MaterialIcons',
                    label: 'Push Notifications',
                    type: 'toggle',
                    value: notifications,
                    onChange: setNotifications,
                },
                {
                    icon: 'location-on',
                    iconLib: 'MaterialIcons',
                    label: 'Location Sharing',
                    type: 'toggle',
                    value: locationSharing,
                    onChange: setLocationSharing,
                },
                {
                    icon: 'dark-mode',
                    iconLib: 'MaterialIcons',
                    label: 'Dark Mode',
                    type: 'toggle',
                    value: darkMode,
                    onChange: setDarkMode,
                },
            ],
        },
        {
            title: 'Parking Preferences',
            items: [
                {
                    icon: 'bolt',
                    iconLib: 'MaterialIcons',
                    label: 'Auto-book nearby spots',
                    type: 'toggle',
                    value: autoBook,
                    onChange: setAutoBook,
                },
                {
                    icon: 'payment',
                    iconLib: 'MaterialIcons',
                    label: 'Payment Methods',
                    type: 'navigate',
                    onPress: () => showSuccess('Payment methods coming soon!'),
                },
                {
                    icon: 'car',
                    iconLib: 'FontAwesome5',
                    label: 'Vehicle Information',
                    type: 'navigate',
                    onPress: () => showSuccess('Vehicle info coming soon!'),
                },
            ],
        },
        {
            title: 'Account',
            items: [
                {
                    icon: 'person',
                    iconLib: 'MaterialIcons',
                    label: 'Edit Profile',
                    type: 'navigate',
                    onPress: () => navigation.navigate('Profile', { role: 'Driver' }),
                },
                {
                    icon: 'lock',
                    iconLib: 'MaterialIcons',
                    label: 'Change Password',
                    type: 'navigate',
                    onPress: () => showSuccess('Change password coming soon!'),
                },
                {
                    icon: 'shield',
                    iconLib: 'MaterialIcons',
                    label: 'Privacy & Security',
                    type: 'navigate',
                    onPress: () => showSuccess('Privacy settings coming soon!'),
                },
            ],
        },
        {
            title: 'Support',
            items: [
                {
                    icon: 'help',
                    iconLib: 'MaterialIcons',
                    label: 'Help & FAQ',
                    type: 'navigate',
                    onPress: () => showSuccess('Help center coming soon!'),
                },
                {
                    icon: 'info',
                    iconLib: 'MaterialIcons',
                    label: 'About',
                    type: 'navigate',
                    onPress: () => showSuccess('ParkEase v1.0.0'),
                },
                {
                    icon: 'star',
                    iconLib: 'MaterialIcons',
                    label: 'Rate App',
                    type: 'navigate',
                    onPress: () => showSuccess('Thank you for your feedback!'),
                },
            ],
        },
    ];

    const renderIcon = (icon, iconLib, color) => {
        if (iconLib === 'FontAwesome5') {
            return <FontAwesome5 name={icon} size={20} color={color} />;
        }
        return <MaterialIcons name={icon} size={24} color={color} />;
    };

    return (
        <View style={styles.container}>
            <DashboardHeader title="Settings" onBackPress={() => navigation.goBack()} />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {settingsSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionCard}>
                            {section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <TouchableOpacity
                                        style={styles.settingItem}
                                        onPress={item.type === 'navigate' ? item.onPress : null}
                                        disabled={item.type !== 'navigate'}
                                    >
                                        <View style={styles.settingLeft}>
                                            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '20' }]}>
                                                {renderIcon(item.icon, item.iconLib, COLORS.primary)}
                                            </View>
                                            <Text style={styles.settingLabel}>{item.label}</Text>
                                        </View>

                                        {item.type === 'toggle' ? (
                                            <Switch
                                                value={item.value}
                                                onValueChange={item.onChange}
                                                trackColor={{ false: '#D1D5DB', true: COLORS.primary + '60' }}
                                                thumbColor={item.value ? COLORS.primary : '#f4f3f4'}
                                                ios_backgroundColor="#D1D5DB"
                                            />
                                        ) : (
                                            <MaterialIcons name="chevron-right" size={24} color="#E5E7EB" />
                                        )}
                                    </TouchableOpacity>
                                    {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        navigation.reset({ index: 0, routes: [{ name: 'PanelSelection' }] });
                    }}
                >
                    <MaterialIcons name="logout" size={24} color={COLORS.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.textSub,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
        marginLeft: 4,
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textMain,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 74,
    },
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
        ...Platform.select({
            ios: {
                shadowColor: COLORS.error,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.error,
        marginLeft: 10,
    },
});

export default DriverSettingsScreen;

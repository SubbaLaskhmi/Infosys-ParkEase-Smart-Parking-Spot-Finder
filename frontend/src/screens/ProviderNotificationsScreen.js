import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProviderNotificationsScreen = ({ navigation }) => {
    const notifications = [
        { id: 1, title: 'New Booking', message: 'Slot A1 booked at City Center Garage', time: '5m ago', type: 'booking', read: false },
        { id: 2, title: 'Payment Received', message: '₹50 credited for Slot B2', time: '1h ago', type: 'payment', read: false },
        { id: 3, title: 'EV Alert', message: 'Charger EV-03 requires maintenance', time: '3h ago', type: 'alert', read: false },
        { id: 4, title: 'Booking Completed', message: 'Vehicle exited from Slot C5 - Duration: 4hrs', time: '5h ago', type: 'booking', read: true },
        { id: 5, title: 'Payment Received', message: '₹350 credited for Slot A3 - Premium parking', time: '6h ago', type: 'payment', read: true },
        { id: 6, title: 'New Booking Request', message: 'Booking request for EV charging slot at Mall Road', time: '8h ago', type: 'booking', read: true },
        { id: 7, title: 'System Update', message: 'Your parking lot capacity increased to 50 vehicles', time: '10h ago', type: 'alert', read: true },
        { id: 8, title: 'Payment Received', message: '₹125 credited for Slot D2', time: '12h ago', type: 'payment', read: true },
        { id: 9, title: 'Maintenance Reminder', message: 'Weekly inspection due for EV-01 and EV-02', time: '1d ago', type: 'alert', read: true },
        { id: 10, title: 'High Demand Alert', message: 'Peak hours: 85% occupancy rate today', time: '1d ago', type: 'booking', read: true },
        { id: 11, title: 'Payment Received', message: '₹275 credited for multiple bookings', time: '2d ago', type: 'payment', read: true },
        { id: 12, title: 'Customer Inquiry', message: 'New message from customer about slot availability', time: '2d ago', type: 'alert', read: true },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'booking': return 'local-parking';
            case 'payment': return 'account-balance-wallet';
            case 'alert': return 'warning';
            default: return 'notifications';
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'booking': return COLORS.primary;
            case 'payment': return COLORS.success;
            case 'alert': return COLORS.error;
            default: return COLORS.textSub;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>Clear all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {notifications.map(notif => (
                    <TouchableOpacity key={notif.id} style={[styles.notifItem, !notif.read && styles.unreadItem]}>
                        <View style={[styles.iconContainer, { backgroundColor: getColor(notif.type) + '15' }]}>
                            <MaterialIcons name={getIcon(notif.type)} size={24} color={getColor(notif.type)} />
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.notifTitle}>{notif.title}</Text>
                                <Text style={styles.notifTime}>{notif.time}</Text>
                            </View>
                            <Text style={styles.notifMsg} numberOfLines={2}>{notif.message}</Text>
                        </View>
                        {!notif.read && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
    markRead: { color: COLORS.primary, fontWeight: '600' },
    content: { padding: 20 },
    notifItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 20, marginBottom: 15, alignItems: 'center', elevation: 2 },
    unreadItem: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1 },
    iconContainer: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    textContainer: { flex: 1 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    notifTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
    notifTime: { fontSize: 12, color: COLORS.textSub },
    notifMsg: { fontSize: 14, color: COLORS.textSub, lineHeight: 20 },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginLeft: 10 }
});

export default ProviderNotificationsScreen;

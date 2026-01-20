import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

const MenuModal = ({ visible, onClose, menuItems, userRole, navigation }) => {
    const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -MENU_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleNavigation = (item) => {
        onClose();
        if (item.label === 'Logout') {
            navigation.reset({ index: 0, routes: [{ name: 'PanelSelection' }] });
        } else if (item.label === 'Profile') {
            navigation.navigate('Profile', { role: userRole });
        } else if (item.nav) {
            navigation.navigate(item.nav);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.sidebarSpace} />
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.secondary]}
                        style={[styles.menuHeader, { paddingTop: Platform.OS === 'ios' ? 60 : 50 }]}
                    >
                        <View style={styles.userIconContainer}>
                            <FontAwesome5 name="user-circle" size={50} color="#fff" />
                        </View>
                        <Text style={styles.username}>{userRole || 'User'}</Text>
                        <Text style={styles.userSubtitle}>Welcome back!</Text>
                    </LinearGradient>

                    <View style={styles.menuItems}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleNavigation(item)}>
                                <View style={[styles.menuIcon, { backgroundColor: item.color ? item.color + '20' : '#F3F4F6' }]}>
                                    <FontAwesome5 name={item.icon} size={18} color={item.color || COLORS.textSub} />
                                </View>
                                <Text style={[styles.menuLabel, { color: item.label === 'Logout' ? COLORS.error : COLORS.textMain }]}>
                                    {item.label}
                                </Text>
                                <MaterialIcons name="chevron-right" size={20} color="#E5E7EB" style={{ marginLeft: 'auto' }} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.menuFooter}>
                        <Text style={styles.versionText}>ParkEase v1.0.0</Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
    sidebarSpace: { flex: 1 },
    menuContainer: { width: MENU_WIDTH, backgroundColor: '#fff', height: '100%', elevation: 16, shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10 },
    menuHeader: { padding: 25, paddingBottom: 30 },
    userIconContainer: { marginBottom: 12 },
    username: { fontSize: 22, fontWeight: '800', color: '#fff' },
    userSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
    menuItems: { padding: 15, paddingTop: 25 },
    menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingVertical: 4 },
    menuIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    menuLabel: { fontSize: 16, fontWeight: '600' },
    menuFooter: { marginTop: 'auto', padding: 25, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
    versionText: { fontSize: 12, color: COLORS.textSub, textAlign: 'center' },
});

export default MenuModal;

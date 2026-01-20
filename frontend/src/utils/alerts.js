import { Platform, Alert } from 'react-native';

const IsWeb = Platform.OS === 'web';

export const showError = (title, message) => {
    if (IsWeb) {
        window.alert(`${title}: ${message}`);
    } else {
        Alert.alert(title, message, [{ text: 'OK', style: 'destructive' }]);
    }
};

export const showSuccess = (title, message, onPress) => {
    if (IsWeb) {
        window.alert(`${title}: ${message}`);
        if (onPress) onPress();
    } else {
        Alert.alert(title, message, [{ text: 'OK', onPress }]);
    }
};

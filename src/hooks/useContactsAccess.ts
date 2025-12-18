import * as Contacts from 'expo-contacts';
import {Linking, Alert, Platform} from 'react-native';
import {useCallback} from 'react';

export const useContactsAccess = () => {
  const requestContactsPermission = useCallback(async (): Promise<boolean> => {
    try {
      const {status} = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        return true;
      }

      Alert.alert(
        "Contact access required",
        "To find friends, the app needs access to your phone book. Please grant permission in settings.",
        [
          {text: "Cancel", style: "cancel"},
          {
            text: "Settings",
            onPress: () => Linking.openSettings()
          }
        ]
      );

      return false;
    } catch (error) {
      console.error("Error requesting contacts permission:", error);
      return false;
    }
  }, []);

  return {requestContactsPermission};
};
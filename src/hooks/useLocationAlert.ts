import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import { useLocationStore } from "../stores/useLocationStore";

export function useLocationAlert() {
  const permissionDenied = useLocationStore((state) => state.permissionDenied);

  useEffect(() => {
    if (permissionDenied) {
      Alert.alert(
        "Location is disabled",
        "For the app to work properly, please allow access to your location.",
        [
          { text: "Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }
  }, [permissionDenied]);
}

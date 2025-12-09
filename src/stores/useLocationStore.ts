import { create } from "zustand";
import * as Location from "expo-location";

interface LocationState {
  coords: { latitude: number; longitude: number } | null;
  address: string | null;
  loading: boolean;
  error: string | null;
  permissionDenied: boolean;
  fetchLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  address: null,
  loading: true,
  error: null,
  permissionDenied: false,
  fetchLocation: async () => {
    try {
      set({ loading: true, error: null });

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        set({ loading: false, permissionDenied: true, error: "Permission denied" });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      set({ coords: location.coords });

      try {
        const geoResult = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (geoResult && geoResult.length > 0) {
          const geo = geoResult[0];
          const street = geo.street || geo.name || "";
          const city = geo.city || geo.subregion || geo.region || "";
          set({ address: `${street}, ${city}`, loading: false });
          return;
        }
      } catch (nativeError) {
        console.warn("Android native geocoder failed, switching to fallback API...");
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`,
        {
          headers: {
            'User-Agent': 'FoodDeliveryApp/1.0'
          }
        }
      );

      const data = await response.json();

      if (data && data.address) {
        const addr = data.address;
        const street = addr.road || addr.pedestrian || addr.suburb || "";
        const city = addr.city || addr.town || addr.village || "";

        set({ address: `${street}, ${city}`, loading: false });
      } else {
        set({ loading: false, address: "Address not found" });
      }

    } catch (e) {
      console.error(e);
      set({ error: "Unable to determine location", loading: false });
    }
  }
}));
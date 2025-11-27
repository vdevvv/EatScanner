import {create} from "zustand";
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
      set({loading: true, error: null});
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        set({loading: false, permissionDenied: true, error: "Permission denied"});
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [geo] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const district = geo.district || geo.name || geo.subregion || "";
      const city = geo.city || geo.region || geo.country || "";

      set({coords: location.coords, address: `${district} ${city}`, loading: false, error: null});
    } catch (e) {
      set({error: "Failed to get location", loading: false});
    }
  }
}))

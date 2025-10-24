import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// --- Типи навігації ---
type RootStackParamList = {
  MyProfile: undefined;
  MyProfileSettings: undefined;
  MyProfileEdit: undefined;
  MyProfileChangePassword: undefined;
  MyProfilePolicyScreen: undefined;
  MyProfileTermsConditions: undefined;
  MyProfileHelpSuport: undefined;
  SignIn: undefined;
};

type MyProfileSettingsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyProfileSettings"
>;

// --- Тип елемента налаштування ---
interface SettingItem {
  id: string;
  title: string;
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
  action: () => void;
  isDestructive?: boolean;
}

// --- Основний компонент ---
const MyProfileSettings: React.FC = () => {
  const navigation = useNavigation<MyProfileSettingsNavigationProp>();

  // --- Обробники натискань ---
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("MyProfile"); // резервне повернення
    }
  };

  const handleEditProfile = () => navigation.navigate("MyProfileEdit");
  const handleChangePassword = () =>
    navigation.navigate("MyProfileChangePassword");
  const handlePrivacyPolicy = () =>
    navigation.navigate("MyProfilePolicyScreen");
  const handleTermsAndConditions = () =>
    navigation.navigate("MyProfileTermsConditions");
  const handleHelpAndSupport = () => navigation.navigate("MyProfileHelpSuport");
  const handleLogOut = () => navigation.navigate("SignIn");

  // --- Масив опцій ---
  const SETTINGS_OPTIONS: SettingItem[] = [
    {
      id: "EditProfile",
      title: "Edit Profile",
      iconName: "person-circle-outline",
      iconLibrary: "Ionicons",
      action: handleEditProfile,
    },
    {
      id: "ChangePassword",
      title: "Change Password",
      iconName: "key-outline",
      iconLibrary: "Ionicons",
      action: handleChangePassword,
    },
    {
      id: "PrivacyPolicy",
      title: "Privacy Policy",
      iconName: "lock-closed-outline",
      iconLibrary: "Ionicons",
      action: handlePrivacyPolicy,
    },
    {
      id: "TermsAndConditions",
      title: "Terms & Conditions",
      iconName: "document-text-outline",
      iconLibrary: "Ionicons",
      action: handleTermsAndConditions,
    },
    {
      id: "HelpAndSupport",
      title: "Help & Support",
      iconName: "help-circle-outline",
      iconLibrary: "Ionicons",
      action: handleHelpAndSupport,
    },
    {
      id: "LogOut",
      title: "Log Out",
      iconName: "exit-outline",
      iconLibrary: "Ionicons",
      action: handleLogOut,
      isDestructive: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Header --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* --- Список опцій --- */}
      <View style={styles.listContainer}>
        {SETTINGS_OPTIONS.map((item) => (
          <SettingRow key={item.id} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

// --- Компонент одного рядка ---
const SettingRow: React.FC<{ item: SettingItem }> = ({ item }) => {
  const IconComponent =
    item.iconLibrary === "Ionicons" ? Ionicons : MaterialCommunityIcons;

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      activeOpacity={0.7}
      onPress={item.action}
    >
      <View style={styles.iconContainer}>
        <IconComponent
          // @ts-ignore
          name={item.iconName}
          size={24}
          color={item.isDestructive ? "#E53935" : "#333"}
        />
      </View>

      <Text
        style={[
          styles.rowTitle,
          { color: item.isDestructive ? "#E53935" : "#333" },
        ]}
      >
        {item.title}
      </Text>

      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </TouchableOpacity>
  );
};

// --- Стилі ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: Platform.OS === "ios" ? 12 : 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 6,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f6f6f6",
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MyProfileSettings;

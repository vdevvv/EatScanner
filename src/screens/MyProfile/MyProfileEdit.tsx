import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  MyProfileScreen: undefined;
  EditProfileScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditProfileScreen"
>;

const LOCAL_AVATAR =
  require("../../assets/profile-avatar.jpg") as ImageSourcePropType;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState("Iryna Hvozdetska");
  const [userName, setUserName] = useState("@foodie_iryna");
  const [email, setEmail] = useState("example@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+91 6895312");

  const avatarSource = LOCAL_AVATAR;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    console.log("✅ Збережено зміни:", {
      fullName,
      userName,
      email,
      phoneNumber,
    });
    navigation.goBack();
  };

  const handleEditAvatar = () => {
    console.log("Редагування аватара...");
  };

  interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "email-address" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words";
  }

  const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeText,
    keyboardType = "default",
    autoCapitalize = "sentences",
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Edit Profile</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={avatarSource} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleEditAvatar}
            >
              <MaterialCommunityIcons name="pencil" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <InputField
            label="User name"
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
          />
          <InputField
            label="EnterEmail address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#eee",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  saveButton: {
    backgroundColor: "#cd6155",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EditProfileScreen;

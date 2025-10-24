import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// --- Типізація навігації ---
type RootStackParamList = {
  PrivacyPolicyScreen: undefined;
  MyProfileScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PrivacyPolicyScreen"
>;

const privacyPolicyContent = {
  introduction:
    "Thank you for using EatScanner. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our mobile application.",
  sections: [
    {
      title: "Information We Collect",
      items: [
        {
          subtitle: "a. Personal Information",
          text: "We may collect the following:",
          list: [
            "Name and profile photo",
            "Email address or phone number",
            "Location (for delivery and restaurant suggestions)",
            "Payment and billing information (via secure third-party processors)",
          ],
        },
        {
          subtitle: "b. Usage Data",
          text: null,
          list: [
            "Videos watched",
            "Meals saved or ordered",
            "Interactions with content (likes, shares, comments)",
            "Device type and operating system",
          ],
        },
        {
          subtitle: "c. Third-Party Login Data",
          text: "If you sign in via Google, Apple, or Facebook, we collect only the necessary profile data (e.g., name and email).",
          list: null,
        },
      ],
    },
    {
      title: "How We Use Your Data",
      text: "We use your data to:",
      list: [
        "Enable food ordering and delivery",
        "Personalize your feed and recommendations",
        "Show relevant nearby restaurants",
        "Process payments securely",
        "Provide customer support",
        "Send important updates and promotions (with your consent)",
      ],
    },
    {
      title: "Location Data",
      text: "We use your location to:",
      list: ["Recommend nearby restaurants", "Improve delivery accuracy"],
      footerText:
        "You can disable location sharing anytime through your device settings.",
    },
    {
      title: "Data Sharing",
      text: "We do not sell your personal information. We may share data with:",
      list: [
        "Delivery partners (to complete your order)",
        "Restaurants (to fulfill orders)",
        "Payment processors (e.g., Stripe, Apple Pay)",
        "Service providers (for hosting, analytics, etc.)",
      ],
      footerText:
        "All third parties are contractually required to protect your data.",
    },
    {
      title: "Data Retention",
      text: "We keep your information only as long as necessary for:",
      list: [
        "Providing services",
        "Legal obligations",
        "Improving app functionality",
      ],
      footerText: "You may request account deletion at any time.",
    },
    {
      title: "Your Rights",
      text: "Depending on your location (e.g., EU/California), you have the right to:",
      list: [
        "Access your data",
        "Correct inaccurate information",
        "Request deletion of your data",
        "Opt-out of marketing communications",
      ],
    },
    {
      title: "Children’s Privacy",
      text: "This app is not intended for children under 13. We do not knowingly collect personal data from children.",
    },
    {
      title: "Changes to This Policy",
      text: "We may update this Privacy Policy from time to time. We will notify you of major changes via in-app notice or email.",
    },
  ],
};

// --- ІНТЕРФЕЙСИ ---
interface PolicyItem {
  subtitle?: string;
  text: string | null;
  list: string[] | null;
}

interface PolicySectionData {
  title: string;
  text?: string;
  list?: string[];
  items?: PolicyItem[];
  footerText?: string;
}

interface PolicySectionProps {
  section: PolicySectionData;
}

// --- КОМПОНЕНТ ОКРЕМОГО РОЗДІЛУ ---
const PolicySection: React.FC<PolicySectionProps> = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>

    {section.text && <Text style={styles.sectionText}>{section.text}</Text>}

    {/* Якщо є підрозділи */}
    {section.items &&
      section.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {item.subtitle && (
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          )}
          {item.text && <Text style={styles.sectionText}>{item.text}</Text>}
          {item.list && (
            <View style={styles.listContainer}>
              {item.list.map((listItem, liIndex) => (
                <View key={liIndex} style={styles.listItem}>
                  <Text style={styles.listItemBullet}>•</Text>
                  <Text style={styles.listItemText}>{listItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

    {/* Якщо просто список */}
    {!section.items && section.list && (
      <View style={styles.listContainer}>
        {section.list.map((listItem, liIndex) => (
          <View key={liIndex} style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text>
            <Text style={styles.listItemText}>{listItem}</Text>
          </View>
        ))}
      </View>
    )}

    {section.footerText && (
      <Text style={styles.footerText}>{section.footerText}</Text>
    )}
  </View>
);

// --- ГОЛОВНИЙ КОМПОНЕНТ ---
const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBack = () => {
    navigation.goBack(); // ✅ повернення на попередній екран
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Privacy Policy</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.introductionText}>
          {privacyPolicyContent.introduction}
        </Text>

        {privacyPolicyContent.sections.map((section, index) => (
          <PolicySection key={index} section={section} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- СТИЛІ ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },
  introductionText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
    lineHeight: 24,
  },
  itemContainer: {
    marginBottom: 15,
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  listContainer: {
    marginLeft: 5,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  listItemBullet: {
    fontSize: 16,
    color: "#444",
    marginRight: 8,
    lineHeight: 24,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  footerText: {
    fontSize: 13,
    color: "#777",
    marginTop: 10,
  },
});

export default PrivacyPolicyScreen;

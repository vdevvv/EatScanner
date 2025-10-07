import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- ДАНІ ПОЛІТИКИ КОНФІДЕНЦІЙНОСТІ (СКОПІЙОВАНО З ВАШОГО HTML) ---
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
  introduction?: string;
  text?: string;
  list?: string[];
  items?: PolicyItem[];
  footerText?: string;
}

interface PolicySectionProps {
  section: PolicySectionData;
}

// --- КОМПОНЕНТ: РОЗДІЛ ПОЛІТИКИ ---
const PolicySection: React.FC<PolicySectionProps> = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>

    {section.text && <Text style={styles.sectionText}>{section.text}</Text>}

    {/* Підрозділи (якщо є) */}
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

    {/* Список головного рівня (якщо немає підрозділів) */}
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

// --- ОСНОВНИЙ ЕКРАН ПОЛІТИКИ КОНФІДЕНЦІЙНОСТІ ---
const PrivacyPolicyScreen: React.FC = () => {
  const handleBack = () => {
    // Логіка навігації: navigation.goBack();
    console.log("Натиснуто Назад");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Privacy Policy</Text>
      </View>

      {/* Скролюваний контент */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Вступний параграф */}
        <Text style={styles.introductionText}>
          {privacyPolicyContent.introduction}
        </Text>

        {/* Рендеринг розділів */}
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

  // --- Стилі Шапки ---
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
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

  // --- Контент Політики ---
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

  // Стилі для списку (імітація маркера '•')
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
    // Налаштовуємо позицію маркера
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

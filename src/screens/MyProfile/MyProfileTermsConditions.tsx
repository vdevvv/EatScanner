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

// --- УМОВИ ТА ПОЛОЖЕННЯ ---
const termsAndConditionsContent = {
  introduction:
    'Welcome to EatScanner. These Terms & Conditions ("Terms") govern your use of our mobile application and related services. By accessing or using the app, you agree to these Terms. If you do not agree, please do not use the app.',
  sections: [
    {
      title: "Eligibility",
      paragraphs: [
        "You must be at least 13 years old to use this app. If you are under the age of 18, you must have permission from a parent or legal guardian.",
      ],
    },
    {
      title: "Use of the App",
      paragraphs: ["You agree to:"],
      list: [
        "Use the app only for lawful purposes",
        "Provide accurate account information",
        "Not misuse or attempt to hack the app",
        "Not upload content that is harmful, offensive, or violates laws",
      ],
      footer:
        "We reserve the right to suspend or terminate accounts that violate these rules.",
    },
    {
      title: "Ordering Food",
      paragraphs: [
        "All food orders are fulfilled by third-party restaurants.",
        "We are not responsible for the quality, preparation, or delivery of meals.",
        "Prices and availability are subject to change and may vary by provider.",
        "Refunds, cancellations, and complaints must be handled directly with the restaurant or delivery platform unless otherwise specified.",
      ],
    },
    {
      title: "Payments",
      paragraphs: [
        "Payments are processed securely via third-party providers (e.g., Stripe, Apple Pay).",
        "We do not store your payment details directly.",
        "You are responsible for ensuring your payment information is accurate and up to date.",
      ],
    },
    {
      title: "User Content",
      paragraphs: [
        "By uploading or saving videos, reviews, or other content, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content for app-related purposes.",
        "We reserve the right to remove content that violates community guidelines or is deemed inappropriate.",
      ],
    },
    {
      title: "Privacy",
      paragraphs: [
        "Your use of the app is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your personal data.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "We provide the app on an “as-is” basis. We are not liable for:",
      ],
      list: [
        "Delays or errors caused by third-party restaurants or services",
        "Loss of data",
        "Technical failures or interruptions",
        "User misconduct or unauthorized account access",
      ],
      footer:
        "To the fullest extent permitted by law, our liability is limited to the amount you paid for the service (if any).",
    },
    {
      title: "Third-Party Links",
      paragraphs: [
        "The app may link to third-party websites or services. We are not responsible for the content, terms, or privacy practices of those external platforms.",
      ],
    },
    {
      title: "Changes to Terms",
      paragraphs: [
        "We may update these Terms from time to time. You will be notified of major changes via the app or email. Continued use of the app means you accept the revised Terms.",
      ],
    },
  ],
};

// --- Типи ---
interface TermsSectionData {
  title: string;
  paragraphs: string[];
  list?: string[];
  footer?: string;
}

interface TermsSectionProps {
  section: TermsSectionData;
}

// --- Компонент розділу ---
const TermsSection: React.FC<TermsSectionProps> = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>

    {section.paragraphs.map((paragraph, index) => (
      <Text key={`p-${index}`} style={styles.sectionText}>
        {paragraph}
      </Text>
    ))}

    {section.list && (
      <View style={styles.listContainer}>
        {section.list.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>
    )}

    {section.footer && <Text style={styles.sectionText}>{section.footer}</Text>}
  </View>
);

// --- Головний екран ---
const TermsAndConditionsScreen: React.FC = () => {
  const handleBack = () => {
    // navigation.goBack();
    console.log("Back pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Terms & Conditions</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.introductionText}>
          {termsAndConditionsContent.introduction}
        </Text>

        {termsAndConditionsContent.sections.map((section, i) => (
          <TermsSection key={i} section={section} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  introductionText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 28,
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
    lineHeight: 24,
    marginBottom: 10,
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
});

export default TermsAndConditionsScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// Припускаємо, що використовується Expo або схожа бібліотека для іконок
import { Ionicons } from "@expo/vector-icons";

// --- ДАНІ УМОВ ТА ПОЛОЖЕНЬ ---
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
        "We are not responsible for the quality, preparation, or safety of the food provided by third-party vendors. Any issues related to food quality or delivery should be directed to the restaurant or delivery platform used for the order.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "All content, logos, designs, and features within the EatScanner app are owned by EatScanner or our licensors and are protected by copyright and other intellectual property laws.",
        "You may not copy, modify, distribute, or create derivative works based on our content without express written permission.",
      ],
    },
    {
      title: "Disclaimers",
      paragraphs: [
        'The app is provided on an "as-is" and "as-available" basis.',
        "We do not guarantee that the app will be uninterrupted, error-free, or completely secure. We are not liable for any damages arising from your use of the app.",
      ],
    },
  ],
};

// --- ІНТЕРФЕЙСИ ---
interface TermsSectionData {
  title: string;
  paragraphs: string[];
  list?: string[];
  footer?: string;
}

interface TermsSectionProps {
  section: TermsSectionData;
}

// --- КОМПОНЕНТ: РОЗДІЛ УМОВ ---
const TermsSection: React.FC<TermsSectionProps> = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>

    {/* Параграфи */}
    {section.paragraphs.map((paragraph, index) => (
      <Text key={`p-${index}`} style={styles.sectionText}>
        {paragraph}
      </Text>
    ))}

    {/* Список (якщо є) */}
    {section.list && (
      <View style={styles.listContainer}>
        {section.list.map((listItem, liIndex) => (
          <View key={liIndex} style={styles.listItem}>
            <Text style={styles.listItemBullet}>•</Text>
            <Text style={styles.listItemText}>{listItem}</Text>
          </View>
        ))}
      </View>
    )}

    {/* Футер/додатковий текст */}
    {section.footer && <Text style={styles.sectionText}>{section.footer}</Text>}
  </View>
);

// --- ОСНОВНИЙ ЕКРАН УМОВ ТА ПОЛОЖЕНЬ ---
const TermsAndConditionsScreen: React.FC = () => {
  const handleBack = () => {
    // Логіка навігації: navigation.goBack();
    console.log("Натиснуто Назад");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          {/* Використовуємо таку ж іконку назад, як на скріншоті */}
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Terms & Conditions</Text>
      </View>

      {/* Скролюваний контент */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Вступний параграф */}
        <Text style={styles.introductionText}>
          {termsAndConditionsContent.introduction}
        </Text>

        {/* Рендеринг розділів */}
        {termsAndConditionsContent.sections.map((section, index) => (
          <TermsSection key={index} section={section as TermsSectionData} />
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

  // --- Стилі Шапки (ідентичні Privacy Policy) ---
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

  // --- Контент Умов ---
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
});

export default TermsAndConditionsScreen;

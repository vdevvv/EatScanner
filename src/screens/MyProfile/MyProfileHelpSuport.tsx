import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
// Припускаємо, що використовується Expo або схожа бібліотека для іконок
import { Ionicons } from "@expo/vector-icons";

// Увімкнення LayoutAnimation для плавних переходів акордеону на Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- ДАНІ ПОШИРЕНИХ ЗАПИТАНЬ (FAQ) ---
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Ordering",
    items: [
      {
        question: "How do I order food from a video?",
        answer:
          "When you see a meal you like, simply tap the 'Order Now' button below the video. This will take you to the 'Where to Order' screen, where you can select a delivery platform (Uber Eats, Talabat, Deliveroo, etc.) or the restaurant's website to complete your order.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Order cancellations and modifications are handled directly by the third-party delivery platform you selected (e.g., Uber Eats). Please refer to their specific policies and contact their customer support for assistance.",
      },
      {
        question: "How do I track my delivery?",
        answer:
          "Delivery tracking is managed by the chosen delivery partner. Once the order is placed, you should receive a link or notification from them to track its progress in real-time.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "How do I update my profile?",
        answer:
          "Navigate to 'Settings' from your Profile screen, then select 'Edit Profile'. Here you can change your full name, username, email, and phone number.",
      },
      {
        question: "How do I update my password?",
        answer:
          "Go to 'Settings' and choose 'Change Password'. You will need to enter your old password, then the new password twice to confirm the changes.",
      },
      {
        question: "How can I delete my account?",
        answer:
          "To delete your account, please contact our support team at support@eatscanner.com. We will guide you through the necessary steps to permanently remove your data.",
      },
    ],
  },
  {
    title: "Saved Videos & Feed",
    items: [
      {
        question: "How do I save a meal video?",
        answer:
          "Tap the bookmark icon (usually located in the top-right corner or on the side panel) while watching a video. It will be added to your 'Saved Video' list on your Profile screen.",
      },
      {
        question: "Can I reorder something I previously watched?",
        answer:
          "Yes. All your past orders are displayed in the 'Past Orders' section of your Profile. You can select an item there to quickly find where to order it again.",
      },
      {
        question: "Why is my feed not showing new videos?",
        answer:
          "Ensure your application is updated to the latest version and you have a stable internet connection. If the problem persists, try clearing the app cache or contacting support.",
      },
    ],
  },
];

// --- КОМПОНЕНТ: ОДИНИЦЯ FAQ (Акордеон) ---
const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    // Застосовуємо анімацію перед зміною стану
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleOpen}>
        <Text style={styles.accordionQuestion}>{item.question}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* Контент, що розкривається */}
      {isOpen && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionAnswer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

// --- ОСНОВНИЙ ЕКРАН ДОВІДКИ ТА ПІДТРИМКИ ---
const HelpAndSupportScreen: React.FC = () => {
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
        <Text style={styles.screenTitle}>Help & Support</Text>
      </View>

      {/* Скролюваний контент */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeading}>FAQs</Text>

        {/* Розділи FAQ */}
        {faqData.map((category, catIndex) => (
          <View key={catIndex} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.items.map((item, itemIndex) => (
              <AccordionItem key={itemIndex} item={item} />
            ))}
          </View>
        ))}

        {/* Контактна підтримка */}
        <View style={styles.contactSupportContainer}>
          <Text style={styles.sectionHeading}>Contact Support</Text>
          <Text style={styles.contactText}>
            Have a question we didn't cover?
          </Text>
          <View style={styles.emailContainer}>
            <Text style={styles.contactLabel}>Email Us:</Text>
            <Text style={styles.contactEmail}>support@eatscanner.com</Text>
          </View>
        </View>
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

  // --- Стилі FAQ ---
  sectionHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    marginTop: 10,
  },

  categoryContainer: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },

  // Акордеон
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  accordionQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    paddingRight: 10,
  },
  accordionContent: {
    paddingBottom: 15,
    paddingRight: 20, // Відступ справа для тексту
  },
  accordionAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },

  // --- Стилі Контактної Підтримки ---
  contactSupportContainer: {
    marginTop: 20,
    paddingBottom: 40,
  },
  contactText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 5,
  },
  contactEmail: {
    fontSize: 16,
    color: "#E57373", // Використовуємо ваш фірмовий колір для виділення
    textDecorationLine: "underline",
  },
});

export default HelpAndSupportScreen;

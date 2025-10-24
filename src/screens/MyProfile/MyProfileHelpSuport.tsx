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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ додано

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
          "When you see a meal you like, tap 'Order Now' below the video. You'll be redirected to 'Where to Order', where you can choose Uber Eats, Talabat, Deliveroo, or the restaurant’s website to complete your purchase.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Cancellations and changes are handled by the delivery platform (e.g., Uber Eats). Contact their support for help.",
      },
      {
        question: "How do I track my delivery?",
        answer:
          "Tracking is managed by your chosen delivery partner. After placing an order, you’ll receive tracking updates directly from them.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "How do I update my profile?",
        answer:
          "Go to 'Settings' → 'Edit Profile'. There you can change your name, username, email, or phone number.",
      },
      {
        question: "How do I change my password?",
        answer:
          "In 'Settings', select 'Change Password'. Enter your old password and then your new one twice to confirm.",
      },
      {
        question: "How can I delete my account?",
        answer:
          "Contact us at support@eatscanner.com. Our team will assist you with account deletion.",
      },
    ],
  },
  {
    title: "Saved Videos & Feed",
    items: [
      {
        question: "How do I save a meal video?",
        answer:
          "Tap the bookmark icon while watching a video. The video will be added to your 'Saved Videos' list.",
      },
      {
        question: "Can I reorder something I watched before?",
        answer:
          "Yes. Visit 'Past Orders' in your profile and tap the meal to reorder.",
      },
      {
        question: "Why isn’t my feed showing new videos?",
        answer:
          "Check that you’re online and have the latest app version. If issues persist, clear cache or contact support.",
      },
    ],
  },
];

// --- Компонент акордеону ---
const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
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

      {isOpen && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionAnswer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

// --- ГОЛОВНИЙ КОМПОНЕНТ ---
const HelpAndSupportScreen: React.FC = () => {
  const navigation = useNavigation(); // ✅ хук для навігації

  const handleBack = () => {
    navigation.goBack(); // ✅ повернення назад
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Help & Support</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeading}>FAQs</Text>

        {faqData.map((category, catIndex) => (
          <View key={catIndex} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.items.map((item, itemIndex) => (
              <AccordionItem key={itemIndex} item={item} />
            ))}
          </View>
        ))}

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
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },
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
    paddingRight: 20,
  },
  accordionAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
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
    color: "#E57373",
    textDecorationLine: "underline",
  },
});

export default HelpAndSupportScreen;

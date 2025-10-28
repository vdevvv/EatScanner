import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 0.85;

// Локальний ассет
const DISH_IMAGE = require("../../assets/pasta.jpg");

// Імітація даних
const dishData = {
  dishName: "Amatriciana pasta",
  description:
    "Tomato sauce, smoked pork neck, red onions, pecorino cheese, chilli. (All meat is slow-cooked in an aromatic blend of spices and chilies)",
  trustpilotRating: 4.3,
  googleRating: 4.0,
  price: 45,
};

// Компонент Рейтингу
interface RatingPillProps {
  platform: "Trustpilot" | "Google";
  rating: number;
  color: string;
  iconName: string;
}

const RatingPill: React.FC<RatingPillProps> = ({
  platform,
  rating,
  color,
  iconName,
}) => (
  <View style={[styles.ratingPill, { backgroundColor: color }]}>
    <MaterialCommunityIcons name={iconName as any} size={14} color="#fff" />
    <Text style={styles.ratingText}>
      {platform} {rating}
    </Text>
  </View>
);

// Основний екран
const DishDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack(); // ← Активна навігація назад
  };

  const handleOrderPress = () => {
    console.log("Order Now pressed");
  };

  return (
    <View style={styles.root}>
      {/* Прозора статус-бар */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Зображення на фоні */}
      <View style={styles.imageContainer}>
        <Image source={DISH_IMAGE} style={styles.dishImage} />
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Контент нижче */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailsCard}>
            <View style={styles.restaurantInfo}>
              <MaterialCommunityIcons
                name="home-outline"
                size={20}
                color="#333"
              />
              <Text style={styles.restaurantName}>Pasta House</Text>
            </View>

            <Text style={styles.dishName}>{dishData.dishName}</Text>
            <Text style={styles.dishDescription}>{dishData.description}</Text>

            {/* Рейтинги */}
            <View style={styles.ratingsContainer}>
              <RatingPill
                platform="Trustpilot"
                rating={dishData.trustpilotRating}
                color="#4CAF50"
                iconName="star"
              />
              <RatingPill
                platform="Google"
                rating={dishData.googleRating}
                color="#3f84f8"
                iconName="google"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Кнопка замовлення */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
          <Text style={styles.orderButtonText}>
            Order Now | AED {dishData.price}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- СТИЛІ ---
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    zIndex: 1,
  },
  dishImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 15,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 30,
  },
  safeArea: {
    flex: 1,
    marginTop: IMAGE_HEIGHT - 40,
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 100,
    zIndex: 2,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginLeft: 8,
  },
  dishName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  ratingsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  orderButton: {
    backgroundColor: "#E57373",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default DishDetailScreen;

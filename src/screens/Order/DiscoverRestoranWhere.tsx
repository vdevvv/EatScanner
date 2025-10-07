import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const DISH_IMAGE = require("../components/pasta.jpg");

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  deliveryTime: string;
  price: number;
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "website",
    name: "Order on Restaurant Website",
    description: "Fastest delivery & discounts",
    deliveryTime: "N/A",
    price: 0,
  },
  {
    id: "uber_eats",
    name: "Uber Eats",
    description: "Estimated delivery:",
    deliveryTime: "25-35 mins",
    price: 55,
  },
  {
    id: "talabat",
    name: "Talabat",
    description: "Estimated delivery:",
    deliveryTime: "45-55 mins",
    price: 45,
  },
  {
    id: "deliveroo",
    name: "Deliveroo",
    description: "Estimated delivery:",
    deliveryTime: "55-60 mins",
    price: 47,
  },
];

const RestaurantHeader: React.FC<{
  restaurantName: string;
  restaurantSubtitle: string;
}> = ({ restaurantName, restaurantSubtitle }) => (
  <View style={styles.restaurantHeaderContainer}>
    <Image source={DISH_IMAGE} style={styles.restaurantHeaderImage} />
    <View style={styles.restaurantHeaderText}>
      <Text style={styles.restaurantHeaderTitle}>
        {restaurantName || "Grandma's Kettle"}
      </Text>
      <Text style={styles.restaurantHeaderSubtitle}>
        {restaurantSubtitle || "Chefs Hall"}
      </Text>
      <View style={styles.ratingsContainer}>
        <View
          style={[styles.ratingPillContainer, { backgroundColor: "#4CAF50" }]}
        >
          <MaterialIcons name="star" size={14} color="#fff" />
          <Text style={styles.ratingPillText}>4.3</Text>
        </View>
        <View
          style={[styles.ratingPillContainer, { backgroundColor: "#3f84f8" }]}
        >
          <MaterialIcons name="star" size={14} color="#fff" />
          <Text style={styles.ratingPillText}>4.0</Text>
        </View>
      </View>
    </View>
  </View>
);

const DeliveryOptionCard: React.FC<{
  option: DeliveryOption;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ option, isSelected, onSelect }) => {
  const isWebsite = option.id === "website";

  return (
    <TouchableOpacity
      style={[styles.deliveryCard, isSelected && styles.deliveryCardSelected]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      <View style={styles.deliveryCardContent}>
        <View
          style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
        >
          {isSelected && <View style={styles.radioDot} />}
        </View>

        <View style={styles.deliveryTextWrapper}>
          <Text
            style={[
              styles.deliveryName,
              isSelected && styles.deliveryNameSelected,
            ]}
          >
            {option.name}
          </Text>
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryDescription}>{option.description}</Text>
            {!isWebsite && (
              <>
                <Text style={styles.deliveryTime}>
                  {" "}
                  | {option.deliveryTime}
                </Text>
                <Text style={styles.deliveryPrice}> | AED {option.price}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OrderScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const restaurantName = "Grandma's Kettle";
  const restaurantSubtitle = "Chefs Hall";
  const isButtonActive = selectedOption !== null;

  const handleSelectOption = (id: string) => {
    setSelectedOption(id);
  };

  const handleMakeOrder = () => {
    if (!isButtonActive) return;
    console.log(`Making an order via: ${selectedOption}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Where to Order</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBlock}>
          <RestaurantHeader
            restaurantName={restaurantName}
            restaurantSubtitle={restaurantSubtitle}
          />
        </View>

        <View style={styles.optionsSection}>
          <Text style={styles.availableOnTitle}>Available on:</Text>
          <View style={styles.deliveryList}>
            {DELIVERY_OPTIONS.map((option) => (
              <DeliveryOptionCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={() => handleSelectOption(option.id)}
              />
            ))}
          </View>
          <Text style={styles.footerNote}>
            Prices and availability may vary by platform.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.makeOrderButton,
            isButtonActive
              ? styles.makeOrderButtonActive
              : styles.makeOrderButtonInactive,
          ]}
          onPress={handleMakeOrder}
          disabled={!isButtonActive}
        >
          <Text style={styles.makeOrderButtonText}>Make an order</Text>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 10 : 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: width,
    position: "relative",
  },
  backButton: {
    padding: 10,
    zIndex: 10,
  },
  screenTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    top: Platform.OS === "android" ? 10 : 0,
    paddingVertical: 10,
  },

  infoBlock: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  restaurantHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantHeaderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  restaurantHeaderText: {
    flex: 1,
  },
  restaurantHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  restaurantHeaderSubtitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingPillContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  ratingPillText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    color: "#fff",
  },

  optionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  availableOnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  deliveryList: {},
  deliveryCard: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryCardSelected: {
    borderColor: "#333",
  },
  deliveryCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  radioButtonSelected: {
    borderColor: "#333",
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  deliveryTextWrapper: {
    flex: 1,
  },
  deliveryName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  deliveryNameSelected: {
    fontWeight: "600",
  },
  deliveryDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  deliveryDescription: {
    fontSize: 13,
    color: "#888",
  },
  deliveryTime: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    marginLeft: 5,
  },
  deliveryPrice: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  footerNote: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  makeOrderButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
  },
  makeOrderButtonInactive: {
    backgroundColor: "#ccc",
  },
  makeOrderButtonActive: {
    backgroundColor: "#E57373",
  },
  makeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default OrderScreen;

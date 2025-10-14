// src/screens/FriendsProfile/FriendsProfileSaved.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  ImageSourcePropType,
  ImageBackground,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  white: "#FFFFFF",
  divider: "#E5E7EB",
  overlay: "rgba(0,0,0,0.4)",
};

// --- Локальні зображення ---
const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;

const SAVED_VIDEOS_DATA = [
  {
    id: "1",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "2",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
  {
    id: "3",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "4",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
  {
    id: "5",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "6",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
];

interface SavedVideoScreenProps {
  onBack?: () => void;
}

const SavedVideoScreen: React.FC<SavedVideoScreenProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log("Back button pressed");
    }
  };

  const VideoItem = ({
    dishName,
    restaurant,
    image,
  }: {
    dishName: string;
    restaurant: string;
    image: ImageSourcePropType;
  }) => (
    <TouchableOpacity style={styles.videoItemContainer} activeOpacity={0.85}>
      <ImageBackground
        source={image}
        style={styles.videoImage}
        resizeMode="cover"
      >
        <View style={styles.bookmarkContainer}>
          <Ionicons name="bookmark" size={40} color="#E9725C" />
        </View>
        <View style={styles.videoTextOverlay}>
          <Text style={styles.videoDishName}>{dishName}</Text>
          <View style={styles.restaurantContainer}>
            <Ionicons name="home-outline" size={12} color="#fff" />
            <Text style={styles.videoRestaurantName}>{restaurant}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Video</Text>

        <Text style={styles.videoCount}>48 videos</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={SAVED_VIDEOS_DATA}
          renderItem={({ item }) => (
            <VideoItem
              dishName={item.dishName}
              restaurant={item.restaurant}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedVideoScreen;

// --------------------------------------------------
const PADDING_HORIZONTAL = 20;
const GRID_ITEM_SIZE = (width - 60) / 2; // 2 columns with padding

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },
  videoCount: { fontSize: 16, color: COLORS.textGrey, fontWeight: "500" },

  gridContainer: { paddingHorizontal: 10 },
  row: { justifyContent: "space-between" },

  videoItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.2,
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoImage: { flex: 1, justifyContent: "flex-end" },
  bookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },
  videoTextOverlay: { 
    padding: 8, 
    backgroundColor: "rgba(0,0,0,0.35)" 
  },
  videoDishName: { 
    fontSize: 12, 
    fontWeight: "600", 
    color: COLORS.white 
  },
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  videoRestaurantName: { 
    fontSize: 10, 
    color: COLORS.white,
    marginLeft: 4,
  },
});
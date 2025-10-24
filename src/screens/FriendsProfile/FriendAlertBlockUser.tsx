// src/screens/BlockUserModalScreen.tsx
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
  ImageBackground,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  white: "#FFFFFF",
  divider: "#E5E7EB",
  overlay: "rgba(0,0,0,0.45)",
};

const AVATAR_SOURCE = require("../../assets/profile-avatar.jpg");
const DISH_1_SOURCE = require("../../assets/sushi-dragons.jpg");
const DISH_2_SOURCE = require("../../assets/potatoes-square.jpg");

const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
    { label: "Shared orders", count: 212 },
    { label: "Shared videos", count: 212 },
  ],
  avatar: AVATAR_SOURCE,
};

const PAST_ORDERS_DATA = [
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

const GRID_ITEM_SIZE = width / 3;

// Тип навігації
type BlockUserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendAlertBlockUser"
>;

const BlockUserModalScreen: React.FC = () => {
  const navigation = useNavigation<BlockUserNavigationProp>();
  const [visible, setVisible] = useState(true);

  const StatItem = ({ count, label }: { count: number; label: string }) => (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const OrderItem = ({
    dishName,
    restaurant,
    image,
  }: {
    dishName: string;
    restaurant: string;
    image: any;
  }) => (
    <TouchableOpacity style={styles.orderItemContainer} activeOpacity={0.85}>
      <ImageBackground
        source={image}
        style={styles.orderImage}
        resizeMode="cover"
      >
        <View style={styles.orderTextOverlay}>
          <Text style={styles.orderDishName}>{dishName}</Text>
          <Text style={styles.orderRestaurantName}>{restaurant}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back")}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>

        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileBlock}>
          <View style={styles.topRow}>
            <Image source={USER_DATA.avatar} style={styles.avatar} />
            <View style={styles.statsContainer}>
              {USER_DATA.stats.map((s, i) => (
                <StatItem key={i} count={s.count} label={s.label} />
              ))}
            </View>
          </View>

          <Text style={styles.userName}>{USER_DATA.name}</Text>
        </View>

        {/* Past Orders */}
        <FlatList
          data={PAST_ORDERS_DATA}
          renderItem={({ item }) => (
            <OrderItem
              dishName={item.dishName}
              restaurant={item.restaurant}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
        />
      </ScrollView>

      {/* Block User Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setVisible(false)}
            >
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Block This User?</Text>
            <Text style={styles.modalSubtitle}>
              They won’t be able to find or contact you.
            </Text>

            <TouchableOpacity
              style={styles.blockButton}
              onPress={() => {
                setVisible(false);
                navigation.navigate("BlockUser");
              }}
            >
              <Text style={styles.blockButtonText}>Block</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BlockUserModalScreen;

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },

  profileBlock: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: { alignItems: "center", flex: 1 },
  statCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey },
  userName: { fontSize: 22, fontWeight: "700", color: COLORS.textDark },

  orderItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
    padding: 1,
  },
  orderImage: { flex: 1, justifyContent: "flex-end" },
  orderTextOverlay: { padding: 8, backgroundColor: "rgba(0,0,0,0.35)" },
  orderDishName: { fontSize: 12, fontWeight: "600", color: COLORS.white },
  orderRestaurantName: { fontSize: 10, color: COLORS.white },

  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 26,
    paddingVertical: 32,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 14, right: 14, padding: 8 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginTop: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  blockButton: {
    backgroundColor: "#E9725C",
    borderRadius: 12,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  blockButtonText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  cancelButton: { marginTop: 16 },
  cancelButtonText: { fontSize: 15, color: "#6B7280", fontWeight: "600" },
});

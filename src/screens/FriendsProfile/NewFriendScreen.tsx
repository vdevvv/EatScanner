// src/screens/UserProfileScreen.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  divider: "#E5E7EB",
  white: "#FFFFFF",
};

const AVATAR = require("../../assets/profile-avatar.jpg");
const FRIENDS = [
  require("../../assets/friend1.jpg"),
  require("../../assets/friend2.jpg"),
  require("../../assets/friend3.jpg"),
  require("../../assets/friend4.jpg"),
];

const UserProfileScreen: React.FC = () => {
  const pastOrders: any[] = []; // тут історія порожня

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>@foodie_iryna</Text>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.topRow}>
            <Image source={AVATAR} style={styles.avatar} />
            <View style={styles.stats}>
              <StatItem number={46} label="Saved" />
              <StatItem number={212} label="Friends" />
              <StatItem number={212} label="Shared orders" />
              <StatItem number={212} label="Shared videos" />
            </View>
          </View>

          <Text style={styles.name}>Talia Gomez</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send message</Text>
          </TouchableOpacity>
        </View>

        {/* Mutual friends */}
        <View style={styles.mutualSection}>
          <View style={styles.mutualLeft}>
            <Text style={styles.mutualNumber}>40</Text>
            <Text style={styles.mutualLabel}>Mutual Friends</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsScroll}
          >
            {FRIENDS.map((f, i) => (
              <Image key={i} source={f} style={styles.friendAvatar} />
            ))}
          </ScrollView>
        </View>

        {/* Past Orders */}
        <View style={styles.pastOrders}>
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>

          {pastOrders.length === 0 ? (
            <View style={styles.emptyOrders}>
              <Image
                source={require("../../assets/empty-orders.png")}
                style={styles.emptyImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No past orders yet</Text>
              <Text style={styles.emptySubtitle}>
                Talia hasn’t ordered anything yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={pastOrders}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                <Image source={item.image} style={styles.orderImage} />
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatItem = ({ number, label }: { number: number; label: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default UserProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },

  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  stats: { flexDirection: "row", flex: 1, justifyContent: "space-between" },
  statItem: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: 18, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.textDark,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: COLORS.white, fontWeight: "600", fontSize: 15 },

  mutualSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  mutualLeft: { alignItems: "center", marginRight: 10 },
  mutualNumber: { fontSize: 18, fontWeight: "700", color: COLORS.textDark },
  mutualLabel: { fontSize: 12, color: COLORS.textGrey },
  friendsScroll: { flexDirection: "row", alignItems: "center" },
  friendAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
  },

  pastOrders: { paddingHorizontal: 20, alignItems: "center", paddingTop: 15 },
  pastOrdersTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 20,
  },

  emptyOrders: { alignItems: "center", justifyContent: "center" },
  emptyImage: { width: width * 0.5, height: width * 0.4, marginBottom: 20 },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: COLORS.textDark },
  emptySubtitle: { fontSize: 13, color: COLORS.textGrey, marginTop: 6 },

  orderImage: {
    width: width / 3 - 8,
    height: width / 3 - 8,
    margin: 2,
    borderRadius: 10,
  },
});

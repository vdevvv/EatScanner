import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#E9725C",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  background: "#FFFFFF",
  divider: "#E5E7EB",
};

// Демодані
const FRIENDS = [
  {
    id: "1",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend1.jpg"),
    status: "add", // add | cancel | message
  },
  {
    id: "2",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend2.jpg"),
    status: "add",
  },
  {
    id: "3",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend3.jpg"),
    status: "cancel",
  },
  {
    id: "4",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend4.jpg"),
    status: "cancel",
  },
  {
    id: "5",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend1.jpg"),
    status: "add",
  },
  {
    id: "6",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend2.jpg"),
    status: "message",
  },
  {
    id: "7",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend3.jpg"),
    status: "message",
  },
  {
    id: "8",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend4.jpg"),
    status: "add",
  },
];

export default function FriendsListScreen() {
  const [search, setSearch] = useState("");

  const filtered = FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderButton = (status: string) => {
    switch (status) {
      case "add":
        return (
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="add-outline" size={18} color={COLORS.primary} />
            <Text style={styles.actionTextAdd}>Add Friend</Text>
          </TouchableOpacity>
        );
      case "cancel":
        return (
          <TouchableOpacity style={styles.cancelBtn}>
            <Ionicons name="remove-outline" size={18} color="#6B7280" />
            <Text style={styles.actionTextCancel}>Cancel Request</Text>
          </TouchableOpacity>
        );
      case "message":
        return (
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.actionTextAdd}>Message</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Talia`s Friends (212)</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={COLORS.textGrey} />
        <TextInput
          placeholder="Search anyone..."
          placeholderTextColor={COLORS.textGrey}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.friendInfo}>
              <Image source={item.avatar} style={styles.avatar} />
              <View>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendHandle}>{item.handle}</Text>
              </View>
            </View>
            {renderButton(item.status)}
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 12, backgroundColor: "transparent" }} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  friendHandle: {
    fontSize: 13,
    color: COLORS.textGrey,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionTextAdd: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
  actionTextCancel: {
    color: COLORS.textGrey,
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 4,
  },
});

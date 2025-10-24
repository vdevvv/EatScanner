import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PROFILE = {
  username: "@foodie_iryna",
  name: "Talia Gomez",
  avatar: require("../assets/avatar.jpg"),
  saved: 46,
  friends: 212,
  sharedOrders: 212,
  sharedVideos: 212,
  mutualCount: 40,
  mutualFriends: [
    { name: "Hugo", image: require("../assets/hugo.jpg") },
    { name: "Laura", image: require("../assets/laura.jpg") },
    { name: "Anne", image: require("../assets/anne.jpg") },
    { name: "Jasper", image: require("../assets/jasper.jpg") },
  ],
};

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.username}>{PROFILE.username}</Text>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </View>

        {/* PROFILE INFO */}
        <View style={styles.profileSection}>
          <Image source={PROFILE.avatar} style={styles.avatar} />
          <Text style={styles.name}>{PROFILE.name}</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.saved}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.friends}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.sharedOrders}</Text>
            <Text style={styles.statLabel}>Shared{"\n"}orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.sharedVideos}</Text>
            <Text style={styles.statLabel}>Shared{"\n"}videos</Text>
          </View>
        </View>

        {/* SEND MESSAGE BUTTON */}
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageText}>Send message</Text>
        </TouchableOpacity>

        {/* MUTUAL FRIENDS (в одному рядку) */}
        <View style={styles.mutualSection}>
          <Text style={styles.mutualText}>
            {PROFILE.mutualCount} Mutual Friends
          </Text>
          <View style={styles.mutualAvatars}>
            {PROFILE.mutualFriends.map((friend, index) => (
              <View key={index} style={{ marginLeft: index === 0 ? 0 : -10 }}>
                <Image source={friend.image} style={styles.mutualAvatar} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
  },
  messageButton: {
    backgroundColor: "#E9725C",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mutualSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mutualText: {
    fontSize: 16,
    fontWeight: "600",
  },
  mutualAvatars: {
    flexDirection: "row",
  },
  mutualAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

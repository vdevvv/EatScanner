import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function MyProfileNoFriends() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.header}>Friends</Text>

      {/* Контент */}
      <View style={styles.content}>
        <Image
          source={require("../assets/no-friends.png")} // заміни на свій шлях до картинки
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>No Friends Yet</Text>
        <Text style={styles.subtitle}>
          Start connecting with food lovers like you!
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Profiles</Text>
        </TouchableOpacity>
      </View>

      {/* Нижній таббар */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="search-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Discovery</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Chats</Text>
        </View>
        <View style={styles.tabItemActive}>
          <MaterialCommunityIcons
            name="handshake-outline"
            size={24}
            color="#D36A55"
          />
          <Text style={[styles.tabText, { color: "#D36A55" }]}>My Friends</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
    marginLeft: 20,
    color: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#D36A55",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  tabItemActive: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});

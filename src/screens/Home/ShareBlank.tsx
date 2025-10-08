import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const ShareSheetScreen = () => {
  const contacts = [
    {
      id: "1",
      name: "Hugo Collins",
      icon: require("../assets/user1.png"),
      badge: "messenger",
    },
    {
      id: "2",
      name: "Laura Scott",
      icon: require("../assets/user2.png"),
      badge: "whatsapp",
    },
    {
      id: "3",
      name: "Anne Frank",
      icon: require("../assets/user3.png"),
      badge: "imessage",
    },
    {
      id: "4",
      name: "Jasper Jacobs",
      icon: require("../assets/user4.png"),
      badge: "imessage",
    },
  ];

  const shareApps = [
    { id: "1", label: "Message", icon: "chatbubble-outline" },
    { id: "2", label: "Mail", icon: "mail-outline" },
    { id: "3", label: "Messenger", icon: "logo-facebook" },
    { id: "4", label: "Whatsapp", icon: "logo-whatsapp" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sheet}>
        {/* Верхня секція */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                <Text style={{ color: "#E85D3D" }}>eat</Text>
                <Text style={{ color: "#FF9A73" }}>scanner</Text>
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.itemTitle}>Fruit Pancake-A Mano</Text>
              <Text style={styles.itemSubtitle}>Eatscanner.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="close" size={22} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Контакти */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contactsRow}
        >
          {contacts.map((user) => (
            <View key={user.id} style={styles.contactItem}>
              <View style={styles.avatarWrapper}>
                <Image source={user.icon} style={styles.avatar} />
                {user.badge === "messenger" && (
                  <View style={[styles.badge, { backgroundColor: "#006AFF" }]}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={12}
                      color="#fff"
                    />
                  </View>
                )}
                {user.badge === "whatsapp" && (
                  <View style={[styles.badge, { backgroundColor: "#25D366" }]}>
                    <Ionicons name="logo-whatsapp" size={12} color="#fff" />
                  </View>
                )}
                {user.badge === "imessage" && (
                  <View style={[styles.badge, { backgroundColor: "#30D158" }]}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={12}
                      color="#fff"
                    />
                  </View>
                )}
              </View>
              <Text style={styles.contactName}>{user.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Іконки додатків */}
        <View style={styles.appsRow}>
          {shareApps.map((app) => (
            <View key={app.id} style={styles.appItem}>
              <View style={styles.appIconWrapper}>
                <Ionicons name={app.icon as any} size={24} color="#000" />
              </View>
              <Text style={styles.appLabel}>{app.label}</Text>
            </View>
          ))}
        </View>

        {/* Дії */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="copy" size={18} color="#333" />
            <Text style={styles.actionText}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="book-open" size={18} color="#333" />
            <Text style={styles.actionText}>Add to reading list</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShareSheetScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    marginRight: 10,
  },
  logoText: {
    fontWeight: "800",
    fontSize: 16,
  },
  titleContainer: {},
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#888",
  },
  contactsRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  contactItem: {
    alignItems: "center",
    marginRight: 18,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  contactName: {
    fontSize: 13,
    color: "#222",
    marginTop: 6,
    textAlign: "center",
    width: 70,
  },
  appsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  appItem: {
    alignItems: "center",
  },
  appIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  appLabel: {
    fontSize: 13,
    color: "#222",
  },
  actionContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 15,
    color: "#222",
    marginLeft: 10,
  },
});

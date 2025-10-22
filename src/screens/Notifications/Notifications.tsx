import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  Notifications: undefined;
};

type NotificationsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Notifications"
>;

// 🔹 Список мокових сповіщень
const notifications = [
  {
    id: "1",
    title: "Talia reacted to your video",
    time: "Just Now",
    icon: "heart-outline" as const,
    isUnread: true,
  },
  {
    id: "2",
    title: "You’ve hit a 3-day streak!",
    time: "2h ago",
    icon: "notifications-outline" as const,
    isUnread: true,
  },
  {
    id: "3",
    title: "Iryna sent a message",
    time: "Yesterday",
    icon: "mail-outline" as const,
    isUnread: false,
  },
  {
    id: "4",
    title: "Talia shared a video",
    time: "Yesterday",
    icon: "arrow-up-outline" as const,
    isUnread: false,
  },
  {
    id: "5",
    title: "Talia reacted to your dish",
    time: "2 days ago",
    icon: "heart-outline" as const,
    isUnread: false,
  },
  {
    id: "6",
    title: "Talia sent a message",
    time: "1 week ago",
    icon: "mail-outline" as const,
    isUnread: false,
  },
  {
    id: "7",
    title: "New comment from Iryna",
    time: "1 week ago",
    icon: "chatbubble-ellipses-outline" as const,
    isUnread: false,
  },
  {
    id: "8",
    title: "Don’t lose your streak!",
    time: "2 weeks ago",
    icon: "notifications-outline" as const,
    isUnread: false,
  },
];

const NotificationsScreen = () => {
  const navigation = useNavigation<NotificationsNavigationProp>();

  const handleBackPress = () => {
    navigation.navigate("HomePageScreen");
  };

  // 🔸 Рендер кожного елемента списку
  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      title: string;
      time: string;
      icon:
        | "heart-outline"
        | "notifications-outline"
        | "mail-outline"
        | "arrow-up-outline"
        | "chatbubble-ellipses-outline";
      isUnread?: boolean;
    };
  }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.8}>
      {/* Іконка */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconBackground}>
          <Ionicons name={item.icon} size={22} color="#fff" />
          {item.isUnread && <View style={styles.redDot} />}
        </View>
      </View>

      {/* Текст */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* Стрілка */}
      <Feather name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#222" />
          <Text style={styles.headerTitle}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Список */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginLeft: 8,
  },
  markReadText: {
    fontSize: 14,
    color: "#A25C48",
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  iconWrapper: {
    marginRight: 14,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#C96F57",
    justifyContent: "center",
    alignItems: "center",
  },
  redDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E53935",
    borderWidth: 1,
    borderColor: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  time: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});

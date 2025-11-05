import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
  username: string;
  name: string;
  avatarUri: string;
}

const BLOCKED_USER: User = {
  username: "@foodie_iryna",
  name: "Talia Gomez",
  avatarUri: "https://placehold.co/80x80/6E3A2F/ffffff?text=TG",
};

const screenHeight = Dimensions.get("window").height;

type BlockUserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BlockUser"
>;

const MoreIcon = () => <Text style={styles.headerIconText}>...</Text>;
const BackIcon = () => <Text style={styles.headerIconText}>{"<"}</Text>;

const BlockedUserScreen: React.FC = () => {
  const navigation = useNavigation<BlockUserNavigationProp>();
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  const handleToggleBlock = () => {
    setIsBlocked((prev) => !prev);
    console.log(
      `User ${BLOCKED_USER.username} ${isBlocked ? "unblocked" : "blocked"}!`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("FriendsProfileFriends")}
        >
          <BackIcon />
        </TouchableOpacity>

        <Text style={styles.username}>{BLOCKED_USER.username}</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => console.log("More options")}
        >
          <MoreIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: BLOCKED_USER.avatarUri }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{BLOCKED_USER.name}</Text>
        </View>

        <View style={styles.centerSection}>
          {isBlocked && (
            <View style={styles.blockIconContainer}>
              <View style={styles.blockIconCircle}>
                <View style={styles.blockIconLine} />
              </View>
            </View>
          )}

          <Text style={styles.mainTitle}>
            {isBlocked ? "You Have Blocked This User." : "You Are Connected."}
          </Text>

          <Text style={styles.subtitle}>
            {isBlocked
              ? "You won't see each other's content or be able to connect."
              : "You can see each other's content and connect."}
          </Text>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: isBlocked ? "#C66B55" : "#4CAF50" },
            ]}
            onPress={handleToggleBlock}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {isBlocked ? "Unblock" : "Block"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlockedUserScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 56,
  },
  headerButton: {
    padding: 4,
  },
  headerIconText: {
    fontSize: 24,
    color: "#000",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: screenHeight * 0.1,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#EEE",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  centerSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  blockIconContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  blockIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 5,
    borderColor: "#C66B55",
    alignItems: "center",
    justifyContent: "center",
  },
  blockIconLine: {
    width: 72,
    height: 5,
    backgroundColor: "#C66B55",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  actionButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

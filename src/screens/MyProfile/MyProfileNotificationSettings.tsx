import React, { useState } from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const MyProfileNotificationSettings = () => {
  const navigation = useNavigation();
  const [enabled, setEnabled] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Help & Support</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 15
        }}
      >
        <Text style={{ fontSize: 16 }}>Get Notifications</Text>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  backButton: {
    padding: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },
})

export default MyProfileNotificationSettings;

import React from "react";
import {MenuItem} from "../../types";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const MenuItemCard: React.FC<{
  item: MenuItem;
  onPress: (item: MenuItem) => void;
}> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.menuItemCard} onPress={() => onPress(item)}>
    <Image source={{uri: item.image}} style={styles.menuItemImage} />
    <View style={styles.menuItemTextContainer}>
      <Text style={styles.menuItemTitle}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemPrice}>££ {item.price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 15,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: "cover",
  },
  menuItemTextContainer: { flex: 1 },
  menuItemTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  menuItemDescription: { fontSize: 13, color: "#888", marginVertical: 3 },
  menuItemPrice: { fontSize: 16, fontWeight: "700", color: "#E57373" },
})

export default MenuItemCard;
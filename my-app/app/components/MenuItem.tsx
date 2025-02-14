import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MenuItemType } from "@/types";
import { Image, Text } from "@rneui/themed";

export default function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.image_url}} 
        style={styles.image} 
        PlaceholderContent={<ActivityIndicator />}
      />      
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Vertically center the text
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,  // Small image
    height: 50,
    borderRadius: 8,
    marginRight: 15,  // Space between image and text
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,  // Allows text to take up remaining space
  },
});

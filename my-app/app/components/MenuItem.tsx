import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MenuItemType } from "@/utils/types";
import { Image, Text } from "@rneui/themed";

export default function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <View style={[styles.container, item.featured && styles.featuredContainer]}>
      {item.featured ? (
        <Image
          source={{ uri: item.image_url }}
          style={styles.featuredImage}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : null}

      <Text style={[styles.text, item.featured && styles.featuredText]}>
        {item.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  featuredContainer: {
    flexDirection: "column", // Stack image and text vertically for featured items
    alignItems: "center",
    paddingVertical: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10, // Space between image and text
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  featuredText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import { MenuItemType } from "@/utils/types";

interface MenuSectionProps {
  category: string;
  items: MenuItemType[];
}

export default function MenuSection({ category, items }: MenuSectionProps) {
  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

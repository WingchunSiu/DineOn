import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import { MenuItemType } from "@/utils/types";

interface MenuSectionProps {
  category: string;
  items: MenuItemType[];
}

export default function MenuSection({ category, items }: MenuSectionProps) {

  const featuredItems = items.filter(item => item.featured);
  const regularItems = items.filter(item => !item.featured);

  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      {featuredItems.map((item, index) => (
        <MenuItem key={`featured-${index}`} item={item} />
      ))}      
      {regularItems.map((item, index) => (
        <MenuItem key={`regular-${index}`} item={item} />
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

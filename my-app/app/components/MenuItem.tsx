import React from 'react';
import { View, Text, Image } from 'react-native';
import { menuStyles } from '../../styles';

interface MenuItemProps {
  item: {
    name: string;
    image_url: string;
    featured?: boolean;
  };
}

export default function MenuItem({ item }: MenuItemProps) {
  const { featured } = item;

  return (
    <View style={featured ? menuStyles.featuredItem : menuStyles.item}>
      <Image
        source={{ uri: item.image_url }}
        style={featured ? menuStyles.featuredImage : menuStyles.itemImage}
      />
      <Text style={featured ? menuStyles.featuredText : menuStyles.itemText}>
        {item.name}
      </Text>
    </View>
  );
}

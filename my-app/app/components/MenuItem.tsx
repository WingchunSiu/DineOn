import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MenuItemType } from '@/utils/types';
import { menuStyles } from '../../styles';

interface MenuItemProps {
  item: MenuItemType;
}

const LabelBadge = ({ label }: { label: string }) => {
  const getLabelStyle = (label: string) => {
    if (label.toLowerCase().includes('vegan')) return styles.veganLabel;
    if (label.toLowerCase().includes('vegetarian')) return styles.vegetarianLabel;
    if (label.toLowerCase().includes('gluten')) return styles.glutenLabel;
    if (label.toLowerCase().includes('dairy')) return styles.dairyLabel;
    if (label.toLowerCase().includes('halal')) return styles.halalLabel;
    return styles.defaultLabel;
  };

  return (
    <View style={[styles.labelBadge, getLabelStyle(label)]}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default function MenuItem({ item }: MenuItemProps) {
  const { featured } = item;

  return (
    <View style={featured ? menuStyles.featuredItem : menuStyles.item}>
      {featured && (
        <Image
          source={{ uri: item.image_url }}
          style={menuStyles.featuredImage}
        />
      )}
      <View style={featured ? styles.featuredContent : styles.regularContent}>
        <Text style={featured ? menuStyles.featuredText : menuStyles.itemText}>
          {item.name}
        </Text>
        {item.labels && item.labels.length > 0 && (
          <View style={styles.labelsContainer}>
            {item.labels.slice(0, 3).map((label, index) => (
              <LabelBadge key={index} label={label} />
            ))}
            {item.labels.length > 3 && (
              <Text style={styles.moreLabels}>+{item.labels.length - 3}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  regularContent: {
    flex: 1,
  },
  featuredContent: {
    alignItems: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 3,
  },
  labelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 3,
  },
  labelText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'white',
  },
  veganLabel: {
    backgroundColor: '#4CAF50',
  },
  vegetarianLabel: {
    backgroundColor: '#8BC34A',
  },
  glutenLabel: {
    backgroundColor: '#FF9800',
  },
  dairyLabel: {
    backgroundColor: '#2196F3',
  },
  halalLabel: {
    backgroundColor: '#9C27B0',
  },
  defaultLabel: {
    backgroundColor: '#757575',
  },
  moreLabels: {
    fontSize: 9,
    color: '#666',
    alignSelf: 'center',
  },
});

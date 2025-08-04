import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { MenuItemType } from '@/utils/types';
import { menuStyles } from '../../styles';
import { router } from 'expo-router';

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

  const handleInfoPress = useCallback(() => {
    console.log('Info icon pressed for:', item.name);
    // @ts-ignore - dynamic route
    router.push({ pathname: 'info', params: { q: item.name } });
  }, [item.name]);

  return (
    <>
    <View style={featured ? menuStyles.featuredItem : menuStyles.item}>
      {featured && (
        <Image
          source={{ uri: item.image_url }}
          style={menuStyles.featuredImage}
        />
      )}
      <View style={featured ? styles.featuredContent : styles.regularContent}>
        <View style={styles.nameRow}>
        <Text style={featured ? menuStyles.featuredText : menuStyles.itemText}>
          {item.name}
        </Text>
          <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
            <Icon name="information-circle-outline" type="ionicon" size={18} color="#888" />
          </TouchableOpacity>
        </View>
        {item.labels && item.labels.length > 0 && (
          <View style={styles.labelsContainer}>
            {item.labels.map((label, index) => (
              <LabelBadge key={index} label={label} />
            ))}
          </View>
        )}
      </View>
    </View>
    {/* navigation route handles info view */}
    </>
  );
}


const styles = StyleSheet.create({
  regularContent: {
    flex: 1,
  },
  featuredContent: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: 6,
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

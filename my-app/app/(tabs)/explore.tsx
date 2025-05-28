import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, Image, Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { colors } from '../../styles';
import { dummyFoodTrucks, FoodTruck } from '@/utils/types';

export default function FoodTrucksScreen() {
  const [expandedTruck, setExpandedTruck] = useState<string | null>(null);

  const handleTruckPress = (truck: FoodTruck) => {
    console.log(`Selected truck: ${truck.name}`);
    // TODO: Navigate to truck details or show more info
  };

  const toggleInfo = (truckId: string) => {
    setExpandedTruck(expandedTruck === truckId ? null : truckId);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={colors.primary.main}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>🚚 Food Trucks</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <Text style={styles.subtitle}>Mobile eats around campus</Text>

        {dummyFoodTrucks.map((truck) => (
          <View key={truck.id}>
            <Card containerStyle={styles.card}>
              <View style={styles.cardHeader}>
                <TouchableOpacity 
                  style={styles.mainContent}
                  onPress={() => handleTruckPress(truck)}
                >
                  <Image
                    source={{ uri: truck.image_url }}
                    containerStyle={styles.image}
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator />}
                  />
                  <View style={styles.titleSection}>
                    <Text style={styles.cardTitle}>{truck.name}</Text>
                    <Text style={styles.locationText}>📍 {truck.location}</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.infoButton}
                  onPress={() => toggleInfo(truck.id)}
                >
                  <Ionicons 
                    name={expandedTruck === truck.id ? "information-circle" : "information-circle-outline"} 
                    size={24} 
                    color={colors.primary.main} 
                  />
                </TouchableOpacity>
              </View>

              {expandedTruck === truck.id && (
                <View style={styles.expandedInfo}>
                  <Card.Divider style={styles.divider} />
                  
                  <View style={styles.infoSection}>
                    <Text style={styles.scheduleText}>⏰ {truck.schedule}</Text>
                    {truck.description && (
                      <Text style={styles.descriptionText}>{truck.description}</Text>
                    )}
                  </View>

                  <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Popular Items:</Text>
                    <View style={styles.menuItems}>
                      {truck.menu.slice(0, 3).map((item, index) => (
                        <Text key={index} style={styles.menuItem}>• {item}</Text>
                      ))}
                      {truck.menu.length > 3 && (
                        <Text style={styles.moreItems}>+{truck.menu.length - 3} more items</Text>
                      )}
                    </View>
                  </View>
                </View>
              )}
            </Card>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Tip: Food truck schedules can vary. Check social media for updates!
          </Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  card: {
    width: 320,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  titleSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
  infoButton: {
    padding: 8,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 12,
  },
  expandedInfo: {
    marginTop: 8,
  },
  infoSection: {
    marginBottom: 12,
  },
  scheduleText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  menuSection: {
    marginTop: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  menuItems: {
    paddingLeft: 10,
  },
  menuItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  moreItems: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginTop: 5,
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

import { View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import { router } from "expo-router";
import React from 'react';
import { Card, Image, Icon, Text} from '@rneui/themed';
import ParallaxScrollView from '@/components/ParallaxScrollView';




const foodPlaces = [
  {
    id: "hall1",
    name: "Parkside Restaurant & Grill",
    type: "dining_hall",
    image: "https://dailytrojan.com/wp-content/uploads/2021/10/ParksideDining_090321_SarahCortina_E003-scaled.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "hall2",
    name: "Village Dining Hall",
    type: "dining_hall",
    image: "https://hospitality.usc.edu/wp-content/uploads/2017/07/01_usc_village_dining_hall.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "hall3",
    name: "Everybody's Kitchen",
    type: "dining_hall",
    image: "https://hospitality.usc.edu/wp-content/uploads/2015/06/03_evk_slider.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "cafe1",
    name: "Trojan Grounds Cafe",
    type: "cafe",
    image: "https://example.com/trojan-grounds.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
];

export default function Homepage() {
  const handlePress = (id: string, type: string) => {
    console.log(`Navigating to menu: id=${id}, type=${type}`);
    // Placeholder: Replace with router.push() later
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#990000', dark: '#800000' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>DineOn!</Text>
        </View>
      }
    >
      <View style={styles.container}>
      <Text style={styles.title}>Pick Your Food Place!</Text>

      {foodPlaces.map((place) => (
          <TouchableOpacity key={place.id} onPress={() => handlePress(place.id, place.type)}>
            <Card containerStyle={styles.card}>
              {/* ✅ Updated to use RNE Image component with a loading placeholder */}
              <Image
                source={{ uri: place.image }}
                containerStyle={styles.image}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Card.Title style={styles.cardTitle}>{place.name}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>⏰ {place.openTime}</Text>
            </Card>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    width: 320,
    height: 280,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 0,
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Nunito-Regular',
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    width: "100%",
    marginBottom: 10,
  },
  image: {
    height: 180,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
});
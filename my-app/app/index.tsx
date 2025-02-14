import { View, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import { useRouter, Stack } from "expo-router";
import React from 'react';
import { Card, Image, Icon, Text} from '@rneui/themed';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { DiningOption, dummyDiningOptions } from "@/types";

export default function Homepage() {
  const router = useRouter();
  
  const handleSelect = (option: DiningOption) => {
    router.push({
      pathname: "../menu",
      params: { data: JSON.stringify(option) }
    })
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
      <Stack.Screen options={{ headerShown: false }} />      
      <View style={styles.container}>
      <Text style={styles.title}>Pick Your Food Place!</Text>

      {dummyDiningOptions.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleSelect(option)}>
            <Card containerStyle={styles.card}>
              {/* ✅ Updated to use RNE Image component with a loading placeholder */}
              <Image
                source={{ uri: option.image_url }}
                containerStyle={styles.image}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Card.Title style={styles.cardTitle}>{option.name}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>⏰ {option.openTime}</Text>
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
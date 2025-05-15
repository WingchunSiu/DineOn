import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import { Card, Image, Icon, Text } from '@rneui/themed';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { colors } from '../../styles';

import { useSelectedDiningHall } from "@/providers/DiningOptionProvider";
import { DiningOption, dummyDiningOptions } from "@/utils/types";
import { getStatus } from "@/utils/util";

export default function Homepage() {
  const router = useRouter();  

  const [statuses, setStatuses] = useState<{ [key: string]: { text: string; color: string } }>({});
  const { setSelectedDiningHall } = useSelectedDiningHall();

  const fadeAnim = useState(new Animated.Value(1))[0];

  const handleSelect = (option: DiningOption) => {
    setSelectedDiningHall(option);    
    router.push({
      pathname: `../Menu`,
      params: { data: JSON.stringify(option) }
    });
  };

  useEffect(() => {
    const newStatuses: Record<string, { text: string; color: string }> = {};

    dummyDiningOptions.forEach((diningOption) => {
      newStatuses[diningOption.id] = getStatus(diningOption);
    });

    setStatuses(newStatuses);
  }, []);

  const openNow = dummyDiningOptions.filter((option) => statuses[option.id]?.text === "Open");
  const closedNow = dummyDiningOptions.filter((option) => statuses[option.id]?.text === "Closed");
  const closingSoon = dummyDiningOptions.filter((option) => statuses[option.id]?.text === "Closing Soon");

  return (
    <ParallaxScrollView
      headerBackgroundColor={colors.primary.main}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>DineOn!</Text>
        </View>
      }
    >
      <View style={styles.container}>


        {/* 🟢 Section for Open Now with Animated Dot */}
        {openNow.length > 0 && (
          <View style={styles.sectionHeader}>
            <Animated.View style={[styles.dot, { backgroundColor: "green", opacity: fadeAnim }]} />
            <Text style={styles.sectionText}>Open Now</Text>
          </View>
        )}
        {openNow.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleSelect(option)}>
            <Card containerStyle={styles.card}>
              <Image
                source={{ uri: option.image_url }}
                containerStyle={styles.image}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Card.Title style={styles.cardTitle}>{option.name}</Card.Title>
              <Card.Divider />
              <Text style={[styles.status, { color: statuses[option.id]?.color }]}>
                {statuses[option.id]?.text || "Loading..."}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}

        {/* 🟡 Section for Closing Soon with Animated Dot */}
        {closingSoon.length > 0 && (
          <View style={styles.sectionHeader}>
            <Animated.View style={[styles.dot, { backgroundColor: "orange", opacity: fadeAnim }]} />
            <Text style={styles.sectionText}>Closing Soon</Text>
          </View>
        )}
        {closingSoon.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleSelect(option)}>
            <Card containerStyle={styles.card}>
              <Image
                source={{ uri: option.image_url }}
                containerStyle={styles.image}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Card.Title style={styles.cardTitle}>{option.name}</Card.Title>
              <Card.Divider />
              <Text style={[styles.status, { color: statuses[option.id]?.color }]}>
                {statuses[option.id]?.text || "Loading..."}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}

        {/* 🔴 Section for Closed Locations with Animated Dot */}
        {closedNow.length > 0 && (
          <View style={styles.sectionHeader}>
            <Animated.View style={[styles.dot, { backgroundColor: "red", opacity: fadeAnim }]} />
            <Text style={styles.sectionText}>Closed</Text>
          </View>
        )}
        {closedNow.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleSelect(option)}>
            <Card containerStyle={styles.card}>
              <Image
                source={{ uri: option.image_url }}
                containerStyle={styles.image}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Card.Title style={styles.cardTitle}>{option.name}</Card.Title>
              <Card.Divider />
              <Text style={[styles.status, { color: statuses[option.id]?.color }]}>
                {statuses[option.id]?.text || "Loading..."}
              </Text>
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
    paddingLeft: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  sectionText: {
    fontSize: 28, // ✅ Bigger text
    fontWeight: "bold",
    textAlign: "left",
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
  status: {
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
});
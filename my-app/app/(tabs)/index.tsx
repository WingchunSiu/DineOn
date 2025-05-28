import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import { Card, Image, Icon, Text } from '@rneui/themed';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import MealPlanCalculator from '@/components/MealPlanCalculator';
import { colors } from '../../styles';

import { useSelectedDiningHall } from "@/providers/DiningOptionProvider";
import { DiningOption, dummyDiningOptions } from "@/utils/types";
import { getStatus } from "@/utils/util";

export default function Homepage() {
  const router = useRouter();  
  const [calculatorVisible, setCalculatorVisible] = useState(false);
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

  // Group dining options by status type
  const openNow = dummyDiningOptions.filter((option) => 
    statuses[option.id]?.text?.includes("Open until") || statuses[option.id]?.text?.includes("Closing in")
  );
  const closedNow = dummyDiningOptions.filter((option) => 
    statuses[option.id]?.text?.includes("Closed") || statuses[option.id]?.text?.includes("Opens at")
  );

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
        {/* Meal Plan Calculator Button */}
        <TouchableOpacity 
          style={styles.calculatorButton}
          onPress={() => setCalculatorVisible(true)}
        >
          <Icon name="calculator" type="ionicon" color="white" size={24} />
          <Text style={styles.calculatorButtonText}>Meal Plan Calculator</Text>
        </TouchableOpacity>

        {/* Meal Plan Calculator Modal */}
        <MealPlanCalculator 
          visible={calculatorVisible}
          onClose={() => setCalculatorVisible(false)}
        />

        {/* 🟢 Section for Open Now */}
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

        {/* 🔴 Section for Closed Locations */}
        {closedNow.length > 0 && (
          <View style={styles.sectionHeader}>
            <Animated.View style={[styles.dot, { backgroundColor: "gray", opacity: fadeAnim }]} />
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
  calculatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calculatorButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  calculatorSection: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calculatorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.primary.main,
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
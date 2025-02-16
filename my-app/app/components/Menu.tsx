import { View, ScrollView, StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { DiningOption, menuData } from "@/utils/types";
import MenuItem from "./MenuItem";

export interface MenuProps {
  timeOfDay: "Breakfast" | "Lunch" | "Dinner";
  diningLocation: DiningOption | null;
}

export default function Menu({ timeOfDay, diningLocation }: MenuProps) {
  if (!diningLocation) return <Text style={styles.errorText}>No menu available</Text>;

  const menuItems = menuData[diningLocation.id][timeOfDay] || [];

  return (
    <ParallaxScrollView      
      headerBackgroundColor={{ light: "#990000", dark: "#990000" }}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{diningLocation.name}</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {    
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    width: "100%",
  },
});

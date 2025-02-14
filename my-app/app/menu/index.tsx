import { useLocalSearchParams, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import Menu from "@/components/Menu";

import { DiningOption } from "../types";

export default function MenuPage() {
  const { data } = useLocalSearchParams();  

  if (!data || typeof data !== "string") return <Text>Invalid data</Text>;

  let diningOption: DiningOption | null = null;
  try {
    diningOption = JSON.parse(data); // Convert back to object
  } catch (error) {
    console.error("Failed to parse data:", error);
    return <Text>Error loading menu</Text>;
  }

  return (    
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />      
      <Menu diningLocation={diningOption} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

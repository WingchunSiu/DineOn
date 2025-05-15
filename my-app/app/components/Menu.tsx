import { View, ScrollView, StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { DiningOption, menuData, MenuItemType } from "@/utils/types";
import MenuSection from "./MenuSection";
import { colors } from '../../styles';

export interface MenuProps {
  timeOfDay: "breakfast" | "lunch" | "dinner";
  diningLocation: DiningOption | null;
}

export default function Menu({ timeOfDay, diningLocation }: MenuProps) {
  if (!diningLocation) return <Text style={styles.errorText}>No menu available</Text>;

  const categories = diningLocation.categories || [];
  const menuItems = menuData[diningLocation.id][timeOfDay] || [];

  return (
    <ParallaxScrollView      
      headerBackgroundColor={colors.primary.main}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{diningLocation.name}</Text>
        </View>
      }
    >
      <View style={styles.container}>        
        {categories.map((category, index) => {
          const itemsByCategory = menuItems.filter((item: MenuItemType) => item.category === category);                    
          
          if (itemsByCategory.length > 0) {
            return (
              <MenuSection key={index} category={category} items={itemsByCategory} />
            );
          }

          return null;          
        })}
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

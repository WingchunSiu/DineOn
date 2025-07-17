import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { DiningOption, MenuItemType } from "@/utils/types";
import MenuSection from "./MenuSection";
import HeaderDayPicker from "./HeaderDayPicker";
import { colors } from '../../styles';
import { fetchMenuItemsFromSupabase } from '@/utils/util';
import { useSelectedDay } from '../providers/DayProvider';

export interface MenuProps {
  timeOfDay: "breakfast" | "lunch" | "dinner";
  diningLocation: DiningOption | null;
}

export default function Menu({ timeOfDay, diningLocation }: MenuProps) {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedDay, setSelectedDay } = useSelectedDay();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!diningLocation) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Convert date string to day of week for database query
        const selectedDate = new Date(selectedDay);
        const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
        
        const items = await fetchMenuItemsFromSupabase(
          diningLocation.id,
          timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1),
          dayOfWeek
        );
        setMenuItems(items);
      } catch (err) {
        setError('Failed to fetch menu items');
        console.error('Error fetching menu:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [diningLocation, timeOfDay, selectedDay]);

  if (!diningLocation) return <Text style={styles.errorText}>No menu available</Text>;

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const categories = diningLocation.categories || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView      
      headerBackgroundColor={colors.primary.main}
      headerImage={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{diningLocation.name}</Text>
          <HeaderDayPicker 
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
        </View>
      }
    >
      <View style={styles.container}>        
        {categories.map((category, index) => {
          const itemsByCategory = menuItems
            .filter((item: MenuItemType) => item.category === category)
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort items alphabetically by name
          
          if (itemsByCategory.length > 0) {
            return (
              <MenuSection key={index} category={category} items={itemsByCategory} />
            );
          }

          return null;          
        })}
        {menuItems.length === 0 && !isLoading && (
          <Text style={styles.noItemsText}>No menu items available for this time</Text>
        )}
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
    color: colors.status.error,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.secondary,
  },
  noItemsText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 20,
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {    
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    flex: 1,
    marginRight: 16,
  },
});

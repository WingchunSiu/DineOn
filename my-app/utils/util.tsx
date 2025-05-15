import { DiningOption } from "./types";
import supabase from './supabaseClient';
import { MenuItemType } from './types';


export const getStatus = (diningOption: DiningOption) => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" }); // Get current day name (Monday, Tuesday, etc.)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert time to minutes

  const { open, close } = diningOption.openTime[day];
  const openTime = parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]); // Convert to minutes
  const closeTime = parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]); // Convert to minutes

  if (currentTime < openTime) {
    return { text: "Closed", color: "red" };
  } else if (currentTime >= closeTime) {
    return { text: "Closed", color: "red" };
  } else if (currentTime >= closeTime - 30) {
    return { text: "Closing Soon", color: "#FFA500" };
  } else {
    return { text: "Open", color: "green" };
  }
};

// Breakfast 7 to 11, Lunch 11 to 4, Dinner 4 to 10
export const getTimeOfDay = () => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

  if (currentTime < 11 * 60) {
    return "breakfast";
  } else if (currentTime < 16 * 60) {
    return "lunch";
  } else {
    return "dinner";
  }
};

/**
 * Fetch menu items for a given dining option, meal type, and day of week from Supabase.
 * @param diningOptionStringId - The string_id of the dining location
 * @param mealType - One of 'Breakfast', 'Lunch', 'Dinner'
 * @param dayOfWeek - Day of week, e.g., 'Monday', 'Tuesday', etc.
 * @returns Array of MenuItemType
 */
export async function fetchMenuItemsFromSupabase(
  diningOptionStringId: string,
  mealType: string,
  dayOfWeek: string
): Promise<MenuItemType[]> {
  console.log('Fetching menu items with params:', { diningOptionStringId, mealType, dayOfWeek });
  // Step 1: Get menu_item_uuids for this dining option, meal, and day
  const { data: linkData, error: linkError } = await supabase
    .from('dining_option_menu_items')
    .select('menu_item_uuid')
    .eq('dining_option_string_id', diningOptionStringId)
    .eq('meal_type', mealType)
    .eq('day_of_week', dayOfWeek);

  console.log('Link data:', linkData);
  if (linkError) {
    console.error('Error fetching menu item links:', linkError);
    return [];
  }
  if (!linkData || linkData.length === 0) {
    return [];
  }

  const menuItemUuids = linkData.map((row: any) => row.menu_item_uuid);
  console.log('Menu item UUIDs:', menuItemUuids);

  // Step 2: Fetch menu item details
  const { data: menuItems, error: menuError } = await supabase
    .from('menu_items')
    .select('*')
    .in('menu_item_uuid', menuItemUuids);

  console.log('Menu items:', menuItems);
  if (menuError) {
    console.error('Error fetching menu items:', menuError);
    return [];
  }
  if (!menuItems) {
    return [];
  }

  // Step 3: Map to MenuItemType (add description as empty string for compatibility)
  return menuItems.map((item: any) => ({
    name: item.name,
    description: '', // No description in schema, so leave blank
    image_url: item.image_url,
    category: item.category,
    featured: item.featured,
    // Optionally, add labels if needed
  }));
}

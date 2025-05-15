import React, { useEffect } from 'react';
import { Text } from '@rneui/themed';
import { Stack } from 'expo-router';

import Menu from '@/components/Menu';
import { useSelectedDiningHall } from '../providers/DiningOptionProvider';
import { fetchMenuItemsFromSupabase } from '@/utils/util';

export default function BreakfastTab() {  
  const { selectedDiningHall } = useSelectedDiningHall();  // Get the selected dining hall from context  
  if (!selectedDiningHall) {
    return <Text>No dining hall selected</Text>;
  }
  
  useEffect(() => {
    const testFetch = async () => {
      const menuItems = await fetchMenuItemsFromSupabase(
        selectedDiningHall.id,
        'Breakfast',
        'Friday' // Hardcoded for testing
      );
      console.log('Fetched menu items:', menuItems);
    };
    testFetch();
  }, [selectedDiningHall]);

  return (
    <>      
      <Menu timeOfDay="breakfast" diningLocation={selectedDiningHall} />
    </>
  );
}

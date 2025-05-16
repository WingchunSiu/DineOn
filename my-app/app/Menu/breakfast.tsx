import React from 'react';
import { Text } from '@rneui/themed';
import { Stack } from 'expo-router';

import Menu from '@/components/Menu';
import { useSelectedDiningHall } from '../providers/DiningOptionProvider';

export default function BreakfastTab() {  
  const { selectedDiningHall } = useSelectedDiningHall();

  if (!selectedDiningHall) {
    return <Text>No dining hall selected</Text>;
  }

  return (
    <>      
      <Menu 
        timeOfDay="breakfast" 
        diningLocation={selectedDiningHall}
      />
    </>
  );
}

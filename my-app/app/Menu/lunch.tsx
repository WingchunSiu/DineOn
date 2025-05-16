import React from 'react';
import { Text } from '@rneui/themed';

import Menu from '@/components/Menu';
import { useSelectedDiningHall } from '../providers/DiningOptionProvider';

export default function LunchTab() {
  const { selectedDiningHall } = useSelectedDiningHall();

  if (!selectedDiningHall) {
    return <Text>No dining hall selected</Text>;
  }

  return (    
    <Menu 
      timeOfDay="lunch" 
      diningLocation={selectedDiningHall}
    />    
  );
}

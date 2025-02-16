import React from 'react';
import { Text } from '@rneui/themed';

import Menu from '@/components/Menu';
import { useSelectedDiningHall } from '../providers/DiningOptionProvider';

export default function DinnerTab() {
  const { selectedDiningHall } = useSelectedDiningHall();  // Get the selected dining hall from context  
  if (!selectedDiningHall) {
    return <Text>No dining hall selected</Text>;
  }
  
  return (    
    <Menu timeOfDay="dinner" diningLocation={selectedDiningHall} />    
  );
}

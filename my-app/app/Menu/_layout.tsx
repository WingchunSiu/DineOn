import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

import BreakfastTab from './breakfast';
import LunchTab from './lunch';
import DinnerTab from './dinner';

const Tab = createMaterialTopTabNavigator();

export default function MenuTabsLayout() {
  const colorScheme = useColorScheme();  

  return (
    <Tab.Navigator
      screenOptions={{ 
        swipeEnabled: true,       
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarIndicatorStyle: { backgroundColor: "#990000" },
        tabBarLabelStyle: { color: 'black' },
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      <Tab.Screen name="Breakfast" component={BreakfastTab} />
      <Tab.Screen name="Lunch" component={LunchTab} />
      <Tab.Screen name="Dinner" component={DinnerTab} />
    </Tab.Navigator>
  );
}

import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, colors } from '../../styles';
import { DayProvider } from '../providers/DayProvider';
import { useSelectedDiningHall } from '../providers/DiningOptionProvider';
import { dummyDiningOptions } from '@/utils/types';

import BreakfastTab from './breakfast';
import LunchTab from './lunch';
import DinnerTab from './dinner';
import { getTimeOfDay } from '@/utils/util';

const Tab = createMaterialTopTabNavigator();

export default function MenuTabsLayout() {
  const { selectedDiningHall, setSelectedDiningHall } = useSelectedDiningHall();

  // Ensure a dining hall is selected so tabs always show content (improves review UX on fresh installs)
  useEffect(() => {
    if (!selectedDiningHall && dummyDiningOptions && dummyDiningOptions.length > 0) {
      setSelectedDiningHall(dummyDiningOptions[0]);
    }
  }, [selectedDiningHall, setSelectedDiningHall]);

  return (
    <DayProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack.Screen name="Menu" options={{ headerShown: false }} />      
      <Tab.Navigator
        initialRouteName={getTimeOfDay()}
        screenOptions={{   
          swipeEnabled: true,       
          tabBarActiveTintColor: theme.tint,
          tabBarIndicatorStyle: { backgroundColor: colors.primary.main },
          tabBarLabelStyle: { color: colors.text.primary },
          tabBarStyle: { backgroundColor: theme.background },
          lazy: true,
        }}
      >      
        <Tab.Screen name="breakfast" component={BreakfastTab} options={{ title: 'Breakfast' }} />
        <Tab.Screen name="lunch" component={LunchTab} options={{ title: 'Lunch' }} />
        <Tab.Screen name="dinner" component={DinnerTab} options={{ title: 'Dinner' }} />
      </Tab.Navigator>
    </SafeAreaView>
    </DayProvider>
  );
}

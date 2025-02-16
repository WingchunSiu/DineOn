import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import BreakfastTab from './breakfast';
import LunchTab from './lunch';
import DinnerTab from './dinner';
import { getTimeOfDay } from '@/utils/util';

const Tab = createMaterialTopTabNavigator();

export default function MenuTabsLayout() {
  const colorScheme = useColorScheme();  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background }}>
      <Stack.Screen name="Menu" options={{ headerShown: false }} />      
      <Tab.Navigator
        initialRouteName={getTimeOfDay()}
        screenOptions={{   
          swipeEnabled: true,       
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIndicatorStyle: { backgroundColor: "#990000" },
          tabBarLabelStyle: { color: 'black' },
          tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        }}
      >      
        <Tab.Screen name="breakfast" component={BreakfastTab} />
        <Tab.Screen name="lunch" component={LunchTab} />
        <Tab.Screen name="dinner" component={DinnerTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

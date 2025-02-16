import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import BreakfastTab from './breakfast';
import LunchTab from './lunch';
import DinnerTab from './dinner';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function MenuTabsLayout() {
  const colorScheme = useColorScheme();  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background }}>
      <Stack.Screen name="Menu" options={{ headerShown: false }} />              
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
    </SafeAreaView>
  );
}

import React from 'react';
import { Tabs, Stack, useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { DiningOption } from '@/types';
import BreakfastTab from './breakfast';

export default function MenuTabsLayout() {
  const colorScheme = useColorScheme();  

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} /> 
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>      
        <Tabs.Screen
          name="breakfast"
          options={{
            title: 'Breakfast',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}        
        />
        <Tabs.Screen
          name="lunch"
          options={{
            title: 'Lunch',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,        
          }}
          />
        <Tabs.Screen
          name="dinner"
          options={{
            title: 'Dinner',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,            
          }}
          />
      </Tabs>
    </>
  );
}

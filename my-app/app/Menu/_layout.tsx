import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, colors } from '../../styles';

import BreakfastTab from './breakfast';
import LunchTab from './lunch';
import DinnerTab from './dinner';
import { getTimeOfDay } from '@/utils/util';

const Tab = createMaterialTopTabNavigator();

export default function MenuTabsLayout() {
  return (
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
        }}
      >      
        <Tab.Screen name="breakfast" component={BreakfastTab} />
        <Tab.Screen name="lunch" component={LunchTab} />
        <Tab.Screen name="dinner" component={DinnerTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

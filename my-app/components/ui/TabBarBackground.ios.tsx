import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
   try {
     const tabHeight = useBottomTabBarHeight();
     const { bottom } = useSafeAreaInsets();
     return tabHeight - bottom;
   } catch (error) {
     // Return 0 when tab bar height is not available
     // (i.e., when not in tab navigation)
     return 0;
   }
}

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { DiningOption } from '@/utils/types';

interface DiningHallCardProps {
  option: DiningOption;
  status: { text: string; color: string };
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export default function DiningHallCard({ option, status, onPress }: DiningHallCardProps) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const isOpenNow = status.text?.includes('Open until') || status.text?.includes('Closing in');
    
    if (isOpenNow) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      
      return () => {
        pulse.stop();
      };
    }
  }, [status.text, pulseAnimation]);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const getCuisineInfo = (option: DiningOption) => {
    switch (option.id) {
      case 'parkside':
        return {
          emoji: '🌍',
          description: 'International Cuisine • Exhibition Style',
        };
      case 'village':
        return {
          emoji: '🌱',
          description: 'Flexitarian & Plant-Based • Healthful Menu',
        };
      case 'evk':
        return {
          emoji: '🏠',
          description: 'Home Style • Buffet & Exhibition Cooking',
        };
      default:
        return {
          emoji: '🍽️',
          description: 'Campus Dining • Varied Options',
        };
    }
  };

  const cuisineInfo = getCuisineInfo(option);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const isOpenNow = status.text?.includes('Open until') || status.text?.includes('Closing in');

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={styles.touchableContainer}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={option.image_url}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.restaurantName}>{option.name}</Text>
          
          <View style={styles.cuisineContainer}>
            <Text style={styles.cuisineText}>
              {cuisineInfo.emoji} {cuisineInfo.description}
            </Text>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusDotContainer}>
              <View style={[styles.statusDot, { backgroundColor: isOpenNow ? '#27ae60' : '#7f8c8d' }]} />
              {isOpenNow && (
                <Animated.View
                  style={[
                    styles.pulseRing,
                    {
                      transform: [{ scale: pulseAnimation }],
                    },
                  ]}
                />
              )}
            </View>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.text}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: 20,
  },
  card: {
    width: width - 60,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  contentContainer: {
    padding: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    marginBottom: 8,
  },
  cuisineContainer: {
    marginBottom: 12,
  },
  cuisineText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDotContainer: {
    position: 'relative',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 2,
  },
  pulseRing: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#27ae60',
    opacity: 0.3,
    zIndex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
}); 
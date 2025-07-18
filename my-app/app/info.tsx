import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Icon } from '@rneui/themed';

export default function InfoScreen() {
  const { q } = useLocalSearchParams<{ q: string }>();
  const query = Array.isArray(q) ? q[0] : q;
  const uri = `https://www.google.com/search?q=${encodeURIComponent(query || '')}&igu=1`;

  return (
    <>
      <Stack.Screen
        options={{
          title: query,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
              <Icon name="close" type="ionicon" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <WebView
        source={{ uri }}
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </>
  );
} 
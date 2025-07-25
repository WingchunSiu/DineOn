import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { dummyFoodTrucks, dummyCafes, FoodTruck, Cafe } from '@/utils/types';
import { colors } from '@/styles';

interface FullScreenMapWithBottomSheetProps {
  onReportPress: () => void;
  onCafeSelect?: (cafe: Cafe) => void;
}

type LocationItem = {
  id: string;
  name: string;
  type: 'food_truck' | 'cafe';
  coordinates: string;
  description: string;
  schedule?: string;
  hours?: string;
  data: FoodTruck | Cafe;
};

const FullScreenMapWithBottomSheet: React.FC<FullScreenMapWithBottomSheetProps> = ({ onReportPress, onCafeSelect }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // USC's center coordinates
  const centerLat = 34.0224;
  const centerLng = -118.2851;

  // Helper function to get coordinates for food truck locations
  const getCoordinatesForLocation = (location: string): string => {
    const locationMap: { [key: string]: string } = {
      'Outside Leavey Library': '34.0216,-118.2828',
      'Near Trousdale Parkway': '34.0205,-118.2851',
      'Alumni Park': '34.0202,-118.2847',
      'Outside Doheny Library': '34.0201,-118.2837',
      'Near 3137 S Hoover St': '34.0189,-118.2851',
      'Near 975 W Jefferson Blvd': '34.0173,-118.2851'
    };
    return locationMap[location] || '34.0205,-118.2851';
  };

  // Combine food trucks and cafes into unified location data
  const allLocations: LocationItem[] = useMemo(() => {
    const foodTruckLocations = dummyFoodTrucks.map(truck => ({
      id: truck.id,
      name: truck.name,
      type: 'food_truck' as const,
      coordinates: getCoordinatesForLocation(truck.location),
      description: truck.description || '',
      schedule: truck.schedule,
      data: truck
    }));

    const cafeLocations = dummyCafes.map(cafe => ({
      id: cafe.id,
      name: cafe.name,
      type: 'cafe' as const,
      coordinates: cafe.coordinates,
      description: cafe.description,
      hours: cafe.hours,
      data: cafe
    }));

    return [...foodTruckLocations, ...cafeLocations];
  }, []);

  // Convert locations to map markers
  const markers = useMemo(() => {
    return allLocations.map(location => {
      const [lat, lng] = location.coordinates.split(',').map(Number);
      return {
        id: location.id,
        coordinate: {
          latitude: lat,
          longitude: lng,
        },
        title: location.name,
        description: location.description,
        type: location.type,
        locationData: location
      };
    });
  }, [allLocations]);

  const focusOnMapLocationAndShowCallout = (location: LocationItem) => {
    const [lat, lng] = location.coordinates.split(',').map(Number);
    
    // First animate to the location
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 1000);
    
    setSelectedLocation(location);
    
    // Then show the callout after a short delay
    setTimeout(() => {
      const markerRef = markersRef.current[location.id];
      if (markerRef) {
        markerRef.showCallout();
      }
    }, 1200); // Slight delay after map animation
  };

  const jumpToLocationAndShowCallout = (location: LocationItem) => {
    const [lat, lng] = location.coordinates.split(',').map(Number);
    
    // First collapse the bottom sheet to show the map
    bottomSheetRef.current?.snapToIndex(0);
    
    // Animate to the location
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 1000);
    
    setSelectedLocation(location);
    
    // Show the callout after animation
    setTimeout(() => {
      const markerRef = markersRef.current[location.id];
      if (markerRef) {
        markerRef.showCallout();
      }
    }, 1100);
  };

  const openBottomSheetForLocation = (location: LocationItem) => {
    setSelectedLocation(location);
    // Expand bottom sheet to show more details
    bottomSheetRef.current?.snapToIndex(1);
    
    // If it's a cafe, trigger the detailed modal
    if (location.type === 'cafe' && onCafeSelect) {
      onCafeSelect(location.data as Cafe);
    }
  };



  const renderLocationItem = ({ item }: { item: LocationItem }) => (
    <TouchableOpacity 
      style={[
        styles.locationItem,
        selectedLocation?.id === item.id && styles.selectedLocationItem
      ]}
      onPress={() => openBottomSheetForLocation(item)}
    >
      <View style={styles.locationContent}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationIcon}>
            {item.type === 'food_truck' ? '🚚' : '☕'}
          </Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.locationDescription}>{item.description}</Text>
            {item.type === 'food_truck' && item.schedule && (
              <Text style={styles.locationTime}>⏰ {item.schedule}</Text>
            )}
            {item.type === 'cafe' && item.hours && (
              <Text style={styles.locationTime}>🕒 {item.hours}</Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.mapIconButton}
        onPress={(e) => {
          e.stopPropagation();
          jumpToLocationAndShowCallout(item);
        }}
      >
        <Ionicons name="location" size={20} color="#C41E3A" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBottomSheetHeader = () => (
    <View style={styles.bottomSheetHeader}>
      <View style={styles.handle} />
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Campus Dining</Text>
        <TouchableOpacity style={styles.reportButton} onPress={onReportPress}>
          <Ionicons name="add-circle-outline" size={24} color="#C41E3A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Full Screen Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsBuildings={true}
        zoomEnabled={true}
        rotateEnabled={false}
        scrollEnabled={true}
        pitchEnabled={false}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            ref={(ref) => {
              if (ref) {
                markersRef.current[marker.id] = ref;
              }
            }}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <View style={[
              styles.customMarker,
              marker.type === 'food_truck' ? styles.foodTruckMarker : styles.cafeMarker,
              selectedLocation?.id === marker.id && styles.selectedMarker
            ]}>
              <Text style={styles.markerText}>
                {marker.type === 'food_truck' ? '🚚' : '☕'}
              </Text>
            </View>
            
            {/* Custom Callout */}
            <Callout
              style={styles.calloutContainer}
              onPress={() => openBottomSheetForLocation(marker.locationData)}
            >
              <View style={styles.calloutContent}>
                <View style={styles.calloutHeader}>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#C41E3A" />
                </View>
                <Text style={styles.calloutDescription} numberOfLines={2}>
                  {marker.description}
                </Text>
                {marker.type === 'food_truck' && marker.locationData.schedule && (
                  <Text style={styles.calloutTime}>⏰ {marker.locationData.schedule}</Text>
                )}
                {marker.type === 'cafe' && marker.locationData.hours && (
                  <Text style={styles.calloutTime}>🕒 {marker.locationData.hours}</Text>
                )}
                <Text style={styles.calloutTap}>Tap for more details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}
        enablePanDownToClose={false}
      >
        <BottomSheetFlatList
          data={allLocations}
          keyExtractor={(item) => item.id}
          renderItem={renderLocationItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderBottomSheetHeader}
        />
      </BottomSheet>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  customMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  foodTruckMarker: {
    backgroundColor: '#FF6B35',
  },
  cafeMarker: {
    backgroundColor: '#8B4513',
  },
  selectedMarker: {
    borderColor: '#C41E3A',
    borderWidth: 3,
    transform: [{ scale: 1.2 }],
  },
  markerText: {
    fontSize: 14,
  },
  // Callout styles
  calloutContainer: {
    width: 200,
    padding: 0,
  },
  calloutContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
  },
  calloutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  calloutDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    lineHeight: 16,
  },
  calloutTime: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  calloutTap: {
    fontSize: 11,
    color: '#C41E3A',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  // Bottom sheet styles
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetHandle: {
    backgroundColor: '#ccc',
    width: 40,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
  },
  bottomSheetHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reportButton: {
    padding: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedLocationItem: {
    borderColor: '#C41E3A',
    borderWidth: 2,
    shadowOpacity: 0.2,
  },
  locationContent: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  locationTime: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  mapIconButton: {
    padding: 8,
    justifyContent: 'center',
  },
});

export default FullScreenMapWithBottomSheet; 
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Location {
  id: string;
  name: string;
  coordinates: string;
  description: string;
}

interface CampusMapProps {
  locations: Location[];
}

const CampusMap: React.FC<CampusMapProps> = ({ locations }) => {
  // USC's approximate center coordinates
  const centerLat = 34.0224;
  const centerLng = -118.2851;
  
  // Convert locations to markers
  const markers = locations.map(loc => {
    const [lat, lng] = loc.coordinates.split(',').map(Number);
    return {
      id: loc.id,
      coordinate: {
        latitude: lat,
        longitude: lng,
      },
      title: loc.name,
      description: loc.description,
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={true}
        zoomEnabled={true}
        rotateEnabled={false}
        scrollEnabled={true}
        pitchEnabled={false}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default CampusMap; 
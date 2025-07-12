import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CampusMap from '@/components/CampusMap';
import { theme, colors } from '../../styles';
import { dummyFoodTrucks, dummyCafes, FoodTruck, Cafe } from '@/utils/types';

const CampusFoodScreen = () => {
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [cafeModalVisible, setCafeModalVisible] = useState(false);

    const openMap = (coordinates: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        Linking.openURL(url);
    };

    const showCafeInfo = (cafe: Cafe) => {
        setSelectedCafe(cafe);
        setCafeModalVisible(true);
    };

    const closeCafeModal = () => {
        setCafeModalVisible(false);
        setSelectedCafe(null);
    };

    // Only show cafes on the map (food trucks hidden for now)
    const allLocations = [
        ...dummyCafes.map(cafe => ({
            id: cafe.id,
            name: cafe.name,
            coordinates: cafe.coordinates,
            description: cafe.description
        }))
        // Food trucks removed from map display
    ];

    // Helper function to get coordinates for food truck locations
    function getCoordinatesForLocation(location: string): string {
        const locationMap: { [key: string]: string } = {
            'Outside Leavey Library': '34.0216,-118.2828',
            'Near Trousdale Parkway': '34.0205,-118.2851',
            'Alumni Park': '34.0202,-118.2847',
            'Outside Doheny Library': '34.0201,-118.2837'
        };
        return locationMap[location] || '34.0205,-118.2851'; // Default to campus center
    }
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={colors.primary.main}
            headerImage={
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>🍽️ Campus Eats</Text>
                </View>
            }
        >
            <View style={styles.container}>
                
                <CampusMap locations={allLocations} />
                
                {/* Food Trucks Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🚚 Food Trucks</Text>
                    <FlatList
                        data={dummyFoodTrucks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                    <Text style={styles.locationText}>📍 {item.location}</Text>
                                    <Text style={styles.scheduleText}>⏰ {item.schedule}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.mapButton}
                                    onPress={() => openMap(getCoordinatesForLocation(item.location))}
                                >
                                    <Ionicons name="location" size={24} color="#C41E3A" />
                                </TouchableOpacity>
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>

                {/* Cafes Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>☕ Cafes & Retail</Text>
                    <FlatList
                        data={dummyCafes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity 
                                    style={styles.itemContent}
                                    onPress={() => showCafeInfo(item)}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.mapButton}
                                    onPress={() => openMap(item.coordinates)}
                                >
                                    <Ionicons name="location" size={24} color="#C41E3A" />
                                </TouchableOpacity>
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        💳 Most locations accept dining dollars, meal swipes, and card payments
                    </Text>
                </View>
            </View>

            {/* Cafe Info Modal */}
            <Modal
                visible={cafeModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={closeCafeModal}>
                            <Ionicons name="close" size={28} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedCafe?.name}</Text>
                        <View style={{ width: 28 }} />
                    </View>
                    
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalDescription}>{selectedCafe?.fullDescription}</Text>
                        
                        <View style={styles.infoSection}>
                            <Text style={styles.infoLabel}>🕒 Hours:</Text>
                            <Text style={styles.infoText}>{selectedCafe?.hours}</Text>
                        </View>
                        
                        <View style={styles.infoSection}>
                            <Text style={styles.infoLabel}>💳 Payment:</Text>
                            <Text style={styles.infoText}>{selectedCafe?.accepts}</Text>
                        </View>
                        
                        <TouchableOpacity
                            style={styles.mapButtonLarge}
                            onPress={() => {
                                closeCafeModal();
                                if (selectedCafe?.coordinates) {
                                    openMap(selectedCafe.coordinates);
                                }
                            }}
                        >
                            <Ionicons name="location" size={20} color="white" />
                            <Text style={styles.mapButtonText}>Open in Maps</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
        fontStyle: "italic",
    },
    headerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
    },
    section: {
        width: '100%',
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.medium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 320,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemContent: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    locationText: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    scheduleText: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    mapButton: {
        padding: 8,
    },
    footer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        width: "100%",
    },
    footerText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },
    infoSection: {
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    mapButtonLarge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C41E3A',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    mapButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default CampusFoodScreen;

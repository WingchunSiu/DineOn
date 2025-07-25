import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FullScreenMapWithBottomSheet from '@/components/FullScreenMapWithBottomSheet';
import FoodTruckReportModal from '@/components/FoodTruckReportModal';
import { dummyCafes, Cafe } from '@/utils/types';

const CampusFoodScreen = () => {
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [cafeModalVisible, setCafeModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

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

    const openReportModal = () => {
        setReportModalVisible(true);
    };

    const closeReportModal = () => {
        setReportModalVisible(false);
    };
    
    return (
        <GestureHandlerRootView style={styles.container}>
            <FullScreenMapWithBottomSheet 
                onReportPress={openReportModal}
                onCafeSelect={showCafeInfo}
                    />

            {/* Food Truck Report Modal */}
            <FoodTruckReportModal 
                visible={reportModalVisible}
                onClose={closeReportModal}
            />

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
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Modal styles (keeping for cafe info modal)
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

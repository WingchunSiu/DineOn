import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodTruck } from '@/utils/types';

interface FoodTruckDetailModalProps {
    visible: boolean;
    foodTruck: FoodTruck | null;
    onClose: () => void;
}

const FoodTruckDetailModal: React.FC<FoodTruckDetailModalProps> = ({ visible, foodTruck, onClose }) => {
    const openMap = (coordinates: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        Linking.openURL(url);
    };

    if (!foodTruck) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{foodTruck.name}</Text>
                    <View style={{ width: 28 }} />
                </View>
                
                <ScrollView style={styles.modalContent}>
                    <Text style={styles.modalDescription}>
                        {foodTruck.description || 'Delicious food truck serving fresh meals!'}
                    </Text>
                    
                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>📍 Location:</Text>
                        <Text style={styles.infoText}>{foodTruck.location}</Text>
                    </View>
                    
                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>⏰ Schedule:</Text>
                        <Text style={styles.infoText}>{foodTruck.schedule}</Text>
                    </View>
                    
                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>🍽️ Popular Items:</Text>
                        {foodTruck.menu.map((item, index) => (
                            <Text key={index} style={styles.menuItem}>• {item}</Text>
                        ))}
                    </View>
                    
                    <TouchableOpacity
                        style={styles.mapButtonLarge}
                        onPress={() => {
                            onClose();
                            openMap(foodTruck.coordinates);
                        }}
                    >
                        <Ionicons name="location" size={20} color="white" />
                        <Text style={styles.mapButtonText}>Open in Maps</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    menuItem: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginLeft: 10,
        marginBottom: 3,
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

export default FoodTruckDetailModal;

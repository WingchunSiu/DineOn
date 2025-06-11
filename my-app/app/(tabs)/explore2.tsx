import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CampusMap from '@/components/CampusMap';
import { theme, colors } from '../../styles';


// Campus cafes and retail dining data
const cafes = [
    { 
        id: '1', 
        name: 'Burger Crush (TCC)',
        url: 'https://hospitality.usc.edu/dining_locations/burger-crush/',
        coordinates: '34.0222,-118.2845', // Trojan Campus Center
        description: 'Gourmet burgers & shakes'
    },
    { 
        id: '2', 
        name: 'Café Annenberg (ANN)',
        url: 'https://hospitality.usc.edu/dining_locations/the-cafe/',
        coordinates: '34.0214,-118.2871', // Annenberg School for Communication
        description: 'Coffee, pastries & light meals'
    },
    { 
        id: '3', 
        name: 'Coffee Bean & Tea Leaf (SCA)',
        url: 'https://hospitality.usc.edu/dining_locations/coffee-bean-tea-leaf-cinema/',
        coordinates: '34.0235,-118.2873', // School of Cinematic Arts
        description: 'Premium coffee & tea'
    },
    { 
        id: '4', 
        name: 'Law School Café (LAW)',
        url: 'https://hospitality.usc.edu/dining_locations/law-school-cafe/',
        coordinates: '34.0186,-118.2844', // Gould School of Law
        description: 'Quick bites & beverages'
    },
];

const CampusFoodScreen = () => {
    const openMap = (coordinates: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        Linking.openURL(url);
    };

    const openCafeWebsite = (url: string) => {
        Linking.openURL(url);
    };
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={colors.primary.main}
            headerImage={
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>☕ Campus Food</Text>
                </View>
            }
        >
            <View style={styles.container}>
                <Text style={styles.subtitle}>Cafes, retail dining & quick bites</Text>
                
                <CampusMap locations={cafes} />
                
                <FlatList
                    data={cafes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity 
                                style={styles.cafeButton}
                                onPress={() => openCafeWebsite(item.url)}
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
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        💳 Most locations accept dining dollars, meal swipes, and card payments
                    </Text>
                </View>
            </View>
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
    cafeButton: {
        flex: 1,
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
});

export default CampusFoodScreen;

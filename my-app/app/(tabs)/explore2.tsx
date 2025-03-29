import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


// Dummy cafes data
const cafes = [
    { 
        id: '1', 
        name: 'Burger Crush (TCC)',
        url: 'https://hospitality.usc.edu/dining_locations/burger-crush/',
        coordinates: '37.7749,-122.4194' 
    },
    { 
        id: '2', 
        name: 'Café Annenberg (ANN)',
        url: 'https://hospitality.usc.edu/dining_locations/the-cafe/',
        coordinates: '37.7750,-122.4180'
    },
    { 
        id: '3', 
        name: 'Coffee Bean & Tea Leaf (SCA)',
        url: 'https://hospitality.usc.edu/dining_locations/coffee-bean-tea-leaf-cinema/',
        coordinates: '37.7748,-122.4170'
    },
    { 
        id: '4', 
        name: 'Law School Café (LAW)',
        url: 'https://hospitality.usc.edu/dining_locations/law-school-cafe/',
        coordinates: '34.018650018873714,-118.28438046071506'
    },
];

const Explore2 = () => {
    const openMap = (coordinates: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        Linking.openURL(url);
    };

    const openCafeWebsite = (url: string) => {
        Linking.openURL(url);
    };
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>More Campus Food</Text>
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
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.mapButton}
                                onPress={() => openMap(item.coordinates)}
                            >
                                <Ionicons name="location" size={24} color="#C41E3A" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",  // Removed undefined `Colors[colorScheme]`
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#C41E3A', // Cardinal red
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
    },
    cafeButton: {
        flex: 1,
    },
    mapButton: {
        padding: 8,
    },
});

export default Explore2;

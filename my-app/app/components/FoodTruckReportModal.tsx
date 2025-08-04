import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FoodTruckReportModalProps {
    visible: boolean;
    onClose: () => void;
}

const FoodTruckReportModal: React.FC<FoodTruckReportModalProps> = ({ visible, onClose }) => {
    const [reportForm, setReportForm] = useState({
        truckName: '',
        location: '',
        schedule: '',
        description: ''
    });

    const closeModal = () => {
        onClose();
        setReportForm({
            truckName: '',
            location: '',
            schedule: '',
            description: ''
        });
    };

    const submitFoodTruckReport = () => {
        if (!reportForm.truckName.trim() || !reportForm.location.trim()) {
            Alert.alert('Missing Information', 'Please fill in at least the truck name and location.');
            return;
        }

        const subject = `New Food Truck Report: ${reportForm.truckName}`;
        const body = `New Food Truck Report\n\n` +
                    `Truck Name: ${reportForm.truckName}\n` +
                    `Location: ${reportForm.location}\n` +
                    `Schedule: ${reportForm.schedule || 'Not specified'}\n` +
                    `Description: ${reportForm.description || 'Not specified'}\n\n` +
                    `Reported via DineOn app`;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=siuw@usc.edu&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        Linking.openURL(gmailUrl).then(() => {
            closeModal();
            Alert.alert('Thank you!', 'Your food truck report has been submitted via Gmail. We appreciate your help in keeping our listings up to date!');
        }).catch(() => {
            Alert.alert('Error', 'Unable to open Gmail. Please make sure you have access to Gmail in your browser.');
        });
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={closeModal}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Report New Food Truck</Text>
                    <View style={{ width: 28 }} />
                </View>
                
                <ScrollView style={styles.modalContent}>
                    <Text style={styles.reportDescription}>
                        Help us grow the foodie community! 🍴
                    </Text>
                    <Text style={styles.reportSubDescription}>
                        Please share any new food trucks you've spotted on or near campus to help keep our listings up to date.
                    </Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Truck Name *</Text>
                        <TextInput
                            style={styles.textInput}
                            value={reportForm.truckName}
                            onChangeText={(text) => setReportForm({...reportForm, truckName: text})}
                            placeholder="e.g., Tasty Tacos"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Location *</Text>
                        <TextInput
                            style={styles.textInput}
                            value={reportForm.location}
                            onChangeText={(text) => setReportForm({...reportForm, location: text})}
                            placeholder="e.g., Outside Leavey Library"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Schedule (if known)</Text>
                        <TextInput
                            style={styles.textInput}
                            value={reportForm.schedule}
                            onChangeText={(text) => setReportForm({...reportForm, schedule: text})}
                            placeholder="e.g., Mon-Fri: 11:00 AM - 3:00 PM"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Description (optional)</Text>
                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            value={reportForm.description}
                            onChangeText={(text) => setReportForm({...reportForm, description: text})}
                            placeholder="Any additional details about the food truck..."
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={submitFoodTruckReport}
                    >
                        <Ionicons name="mail" size={20} color="white" />
                        <Text style={styles.submitButtonText}>Submit Report</Text>
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
    reportDescription: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    reportSubDescription: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        minHeight: 80,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C41E3A',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default FoodTruckReportModal; 
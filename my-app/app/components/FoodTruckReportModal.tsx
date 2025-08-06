import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Clipboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FoodTruckReportModalProps {
    visible: boolean;
    onClose: () => void;
}

const FoodTruckReportModal: React.FC<FoodTruckReportModalProps> = ({ visible, onClose }) => {
    const emailAddress = 'siuw@usc.edu';

    const copyEmailToClipboard = () => {
        Clipboard.setString(emailAddress);
        Alert.alert(
            'Email Copied! 📧',
            `${emailAddress} has been copied to your clipboard. You can now paste it in your email app.`,
            [{ text: 'Got it!', style: 'default' }]
        );
    };

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
                    <Text style={styles.modalTitle}>Report New Food Truck</Text>
                    <View style={{ width: 28 }} />
                </View>
                
                <View style={styles.modalContent}>
                    <Text style={styles.reportDescription}>
                        Help us grow the foodie community! 🍴
                    </Text>
                    <Text style={styles.reportSubDescription}>
                        Spotted a new food truck on or near campus? Email us the details!
                    </Text>
                    
                    <View style={styles.emailSection}>
                        <Text style={styles.emailLabel}>Send your report to:</Text>
                        <TouchableOpacity 
                            style={styles.emailButton}
                            onPress={copyEmailToClipboard}
                        >
                            <Ionicons name="mail" size={24} color="#C41E3A" />
                            <Text style={styles.emailText}>{emailAddress}</Text>
                            <Ionicons name="copy" size={20} color="#666" />
                        </TouchableOpacity>
                        <Text style={styles.emailHint}>Tap to copy email address</Text>
                    </View>

                    <View style={styles.instructionSection}>
                        <Text style={styles.instructionTitle}>What to include:</Text>
                        <Text style={styles.instructionItem}>• Food truck name</Text>
                        <Text style={styles.instructionItem}>• Location where you saw it</Text>
                        <Text style={styles.instructionItem}>• Schedule (if known)</Text>
                        <Text style={styles.instructionItem}>• Type of food they serve</Text>
                    </View>
                </View>
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
        justifyContent: 'center',
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
        marginBottom: 30,
        textAlign: 'center',
    },
    emailSection: {
        marginBottom: 30,
        alignItems: 'center',
    },
    emailLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    emailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#C41E3A',
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#C41E3A',
        marginHorizontal: 12,
        flex: 1,
        textAlign: 'center',
    },
    emailHint: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
    },
    instructionSection: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 12,
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    instructionItem: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 4,
    },
});

export default FoodTruckReportModal; 
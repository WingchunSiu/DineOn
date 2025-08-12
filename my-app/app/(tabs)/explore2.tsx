import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FullScreenMapWithBottomSheet from '@/components/FullScreenMapWithBottomSheet';
import FoodTruckReportModal from '@/components/FoodTruckReportModal';
import FoodTruckDetailModal from '@/components/FoodTruckDetailModal';
import CafeDetailModal from '@/components/CafeDetailModal';
import { dummyCafes, Cafe, FoodTruck } from '@/utils/types';

const CampusFoodScreen = () => {
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [cafeModalVisible, setCafeModalVisible] = useState(false);
    const [selectedFoodTruck, setSelectedFoodTruck] = useState<FoodTruck | null>(null);
    const [foodTruckModalVisible, setFoodTruckModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const showCafeInfo = (cafe: Cafe) => {
        setSelectedCafe(cafe);
        setCafeModalVisible(true);
    };

    const closeCafeModal = () => {
        setCafeModalVisible(false);
        setSelectedCafe(null);
    };

    const showFoodTruckInfo = (foodTruck: FoodTruck) => {
        setSelectedFoodTruck(foodTruck);
        setFoodTruckModalVisible(true);
    };

    const closeFoodTruckModal = () => {
        setFoodTruckModalVisible(false);
        setSelectedFoodTruck(null);
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
                onFoodTruckSelect={showFoodTruckInfo}
                    />

            {/* Food Truck Report Modal */}
            <FoodTruckReportModal 
                visible={reportModalVisible}
                onClose={closeReportModal}
            />

            {/* Food Truck Detail Modal */}
            <FoodTruckDetailModal
                visible={foodTruckModalVisible}
                foodTruck={selectedFoodTruck}
                onClose={closeFoodTruckModal}
            />

            {/* Cafe Detail Modal */}
            <CafeDetailModal
                visible={cafeModalVisible}
                cafe={selectedCafe}
                onClose={closeCafeModal}
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CampusFoodScreen;

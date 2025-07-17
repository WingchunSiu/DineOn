import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';
import { colors } from '../../styles';

interface HeaderDayPickerProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}

// Generate next 7 days starting from today
const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      dateString: date.toISOString().split('T')[0], // YYYY-MM-DD for internal tracking
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }), // Display name
      isToday: i === 0
    });
  }
  return days;
};

export default function HeaderDayPicker({ selectedDay, onDaySelect }: HeaderDayPickerProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const availableDays = getNext7Days();

  const getSelectedDayName = () => {
    const selectedDate = new Date(selectedDay);
    return selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleDaySelect = (dateString: string) => {
    onDaySelect(dateString);
    setIsPickerVisible(false);
  };

  const renderDayItem = ({ item }: { item: typeof availableDays[0] }) => (
    <TouchableOpacity
      style={[
        styles.dayItem,
        selectedDay === item.dateString && styles.selectedDayItem,
        item.isToday && styles.todayDayItem
      ]}
      onPress={() => handleDaySelect(item.dateString)}
    >
      <View style={styles.dayItemContent}>
        <Text style={[
          styles.dayItemText,
          selectedDay === item.dateString && styles.selectedDayItemText,
          item.isToday && styles.todayDayItemText
        ]}>
          {item.weekday}
        </Text>
        {item.isToday && (
          <View style={styles.todayIndicator}>
            <Text style={styles.todayIndicatorText}>Today</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity 
        style={styles.pickerButton}
        onPress={() => setIsPickerVisible(true)}
      >
        <Icon 
          name="calendar-outline" 
          type="ionicon" 
          color="white" 
          size={20}
          style={styles.calendarIcon}
        />
        <Text style={styles.pickerButtonText}>{getSelectedDayName()}</Text>
        <Icon 
          name="chevron-down" 
          type="ionicon" 
          color="white" 
          size={16}
        />
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Day</Text>
              <TouchableOpacity 
                onPress={() => setIsPickerVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" type="ionicon" color="#666" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableDays}
              renderItem={renderDayItem}
              keyExtractor={(item) => item.dateString}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  calendarIcon: {
    marginRight: 8,
  },
  pickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '80%',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  dayItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDayItem: {
    backgroundColor: colors.primary.main,
  },
  todayDayItem: {
    backgroundColor: '#f8f9ff',
  },
  dayItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayItemText: {
    color: 'white',
    fontWeight: '600',
  },
  todayDayItemText: {
    color: colors.primary.main,
    fontWeight: '600',
  },
  todayIndicator: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  todayIndicatorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
}); 
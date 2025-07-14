import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles';
import { MealPlan, mealPlans, standardPrices } from '@/utils/types';

interface MealPlanCalculatorProps {
  visible: boolean;
  onClose: () => void;
}

export default function MealPlanCalculator({visible, onClose }: MealPlanCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [planSelectorVisible, setPlanSelectorVisible] = useState(false);
  const [usedSwipes, setUsedSwipes] = useState<string>('');
  const [weeksLeft, setWeeksLeft] = useState<string>('');
  const [usedDiningDollars, setUsedDiningDollars] = useState<string>('');
  const [usedCampusCenterSwipes, setUsedCampusCenterSwipes] = useState<string>('');

  // Calculation Functions
  const getSwipeValue = (plan: MealPlan) => {
    if (!plan.swipes) return 0;
    // Calculate the cost of swipes by subtracting dining dollars from total cost
    const swipeCost = plan.totalCost - (plan.diningDollars || 0);
    return swipeCost / plan.swipes;
  };

  const getBreakEvenMealsPerWeek = (plan: MealPlan) => {
    // For unlimited plans (Cardinal), calculate based on average meal price
    if (plan.swipes === 0) {
      const avgMealPrice = (standardPrices.breakfast + standardPrices.lunch + standardPrices.dinner) / 3;
      return Math.round((plan.totalCost / (avgMealPrice * 16)) * 10) / 10; // 16 week semester
    }
    // For plans with no swipes (Trojan plan), return 0
    if (!plan.swipes) return 0;
    // For plans with specific number of swipes
    return Math.round((plan.swipes / 16) * 10) / 10; // 16 week semester
  };

  const getPlanDescription = (plan: MealPlan) => {
    switch (plan.id) {
      case "cardinal":
        return {
          title: "The Cardinal Meal Plan",
          description: "Gives you unlimited access to our residential dining halls, no matter how often you'd like to visit them. They offer a comfortable space and a variety of food choices for a meal, a snack, a visit with friends or a convenient place to work on a class project.",
          features: [
            "Unlimited Residential Meal Swipes",
            "7 guest swipes per semester",
            "2 Campus Center Meal Swipes per week at Seeds Marketplace, Yaki Bowls, Slice Shop, TacoTaco, Burger Crush, and C&G Juice Co. (these swipes reset every Sunday)"
          ]
        };
      case "trojan":
        return {
          title: "The Trojan Plan",
          description: "Perfect for students who prefer flexibility in their dining options. With $4,605 in Dining Dollars, you can use them at any USC Hospitality location, including campus restaurants, cafes, and convenience stores.",
          features: [
            "Use at any USC Hospitality location",
            "Flexible spending on meals, snacks, and beverages",
            "No expiration during the semester"
          ]
        };
      case "flex120":
        return {
          title: "The Flex120 Plan",
          description: "Combines the convenience of meal swipes with the flexibility of Dining Dollars. This plan includes 120 meal swipes for use at residential dining halls and $150 in Dining Dollars.",
          features: [
            "120 meal swipes for residential dining halls",
            "$150 in Dining Dollars for flexible spending",
            "Perfect balance of structured meals and flexibility"
          ]
        };
      case "community25":
        return {
          title: "The Community 25 Plan",
          description: "Designed for students who live off-campus or prefer to cook their own meals. This plan includes 25 meal swipes for use at residential dining halls and $50 in Dining Dollars.",
          features: [
            "25 meal swipes for residential dining halls",
            "$50 in Dining Dollars for flexible spending",
            "Great for occasional campus dining"
          ]
        };
      case "community50":
        return {
          title: "The Community 50 Plan",
          description: "Offers more flexibility than the Community 25 Plan, with 50 meal swipes for use at residential dining halls and $100 in Dining Dollars.",
          features: [
            "50 meal swipes for residential dining halls",
            "$100 in Dining Dollars for flexible spending",
            "Ideal for regular campus dining access"
          ]
        };
      case "dining_block_250":
        return {
          title: "Dining Dollar Block $250",
          description: "Offers a 10% discount on Dining Dollars, making it a cost-effective option for students who prefer flexible dining.",
          features: [
            "$250 in Dining Dollars (10% discount)",
            "Use at any USC Hospitality location",
            "Flexible spending on any purchase"
          ]
        };
      case "dining_block_500":
        return {
          title: "Dining Dollar Block $500",
          description: "Offers a 10% discount on Dining Dollars, making it a cost-effective option for students who prefer flexible dining.",
          features: [
            "$500 in Dining Dollars (10% discount)",
            "Use at any USC Hospitality location",
            "Flexible spending on any purchase"
          ]
        };
      default:
        return {
          title: plan.name,
          description: plan.description,
          features: []
        };
    }
  };

  const getRemainingValue = () => {
    if (!selectedPlan) return { swipes: 0, dollars: 0 };
    
    if (selectedPlan.swipes === 0) {
      // For Cardinal Plan
      const avgMealPrice = (standardPrices.breakfast + standardPrices.lunch + standardPrices.dinner) / 3;
      const mealsUsed = parseInt(usedSwipes) || 0;
      const remainingSwipeValue = selectedPlan.totalCost - (mealsUsed * avgMealPrice);
      return {
        swipes: remainingSwipeValue,
        dollars: 0
      };
    }
    
    const remainingSwipes = (selectedPlan.swipes || 0) - (parseInt(usedSwipes) || 0);
    const swipeValue = getSwipeValue(selectedPlan);
    const remainingSwipeValue = remainingSwipes * swipeValue;
    
    const remainingDollars = (selectedPlan.diningDollars || 0) - (parseInt(usedDiningDollars) || 0);
    
    return {
      swipes: remainingSwipeValue,
      dollars: remainingDollars
    };
  };

  const getRecommendedWeeklyEating = () => {
    if (!selectedPlan || !weeksLeft) return 0;
    
    if (selectedPlan.swipes === 0) {
      // For Cardinal Plan, calculate based on average meal price
      const avgMealPrice = (standardPrices.breakfast + standardPrices.lunch + standardPrices.dinner) / 3;
      const weeksRemaining = parseInt(weeksLeft);
      const remainingValue = selectedPlan.totalCost - (parseInt(usedSwipes) * avgMealPrice);
      return Math.round((remainingValue / (avgMealPrice * weeksRemaining)) * 10) / 10;
    }
    
    const remainingSwipes = (selectedPlan.swipes || 0) - parseInt(usedSwipes);
    const weeksRemaining = parseInt(weeksLeft);
    
    return Math.round((remainingSwipes / weeksRemaining) * 10) / 10;
  };

  const renderPlanDescription = () => {
    if (!selectedPlan) return null;
    
    const planInfo = getPlanDescription(selectedPlan);
    return (
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionTitle}>{planInfo.title}</Text>
        <Text style={styles.descriptionText}>{planInfo.description}</Text>
        {planInfo.features.map((feature, index) => (
          <Text key={index} style={styles.featureText}>• {feature}</Text>
        ))}
      </View>
    );
  };

  const renderCardinalPlanSummary = () => {
    if (!selectedPlan) return null;
    return (
      <View>
        <Text style={styles.summaryText}>🍽️ Unlimited Residential Meal Swipes</Text>
        <Text style={styles.summaryText}>
          💡 Average value per meal: ${(() => {
            const breakEvenMeals = getBreakEvenMealsPerWeek(selectedPlan);
            if (breakEvenMeals > 0) {
              return (selectedPlan.totalCost / (breakEvenMeals * 16)).toFixed(2);
            }
            return "18.32";
          })()}
        </Text>
      </View>
    );
  };

  const renderSwipesPlanSummary = () => {
    if (!selectedPlan) return null;
    return (
      <View>
        <Text style={styles.summaryText}>
          🍽️ {selectedPlan.swipes} Meal Swipes → Effective value per swipe: ${getSwipeValue(selectedPlan).toFixed(2)}
        </Text>
        {selectedPlan.diningDollars && (
          <Text style={styles.summaryText}>💵 + ${selectedPlan.diningDollars} Dining Dollars</Text>
        )}
      </View>
    );
  };

  const renderDiningDollarsOnlySummary = () => {
    if (!selectedPlan) return null;
    return (
      <Text style={styles.summaryText}>💵 ${selectedPlan.diningDollars} Dining Dollars</Text>
    );
  };

  const renderCardinalValueBox = () => {
    if (!selectedPlan) return null;
    return (
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>
          ✅ Good value if you eat more than {getBreakEvenMealsPerWeek(selectedPlan)} times per week.
        </Text>
        <Text style={styles.valueText}>
          ❌ You lose money if you eat less than {getBreakEvenMealsPerWeek(selectedPlan)} times per week.
        </Text>
      </View>
    );
  };

  const renderSwipesValueBox = () => {
    if (!selectedPlan) return null;
    return (
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>✅ Good value if you use all swipes.</Text>
        <Text style={styles.valueText}>
          ❌ You lose money if you eat less than {getBreakEvenMealsPerWeek(selectedPlan)} times per week.
        </Text>
      </View>
    );
  };

  const renderDiningDollarsValueBox = () => (
    <View style={styles.valueBox}>
      <Text style={styles.valueText}>✅ Great flexibility - use at any USC Hospitality location.</Text>
      <Text style={styles.valueText}>💡 Perfect for students who prefer to choose when and where to eat.</Text>
    </View>
  );

  const renderCardinalTracking = () => {
    if (!selectedPlan) return null;
    return (
      <View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Residential meals used:</Text>
          <TextInput
            style={styles.input}
            value={usedSwipes}
            onChangeText={setUsedSwipes}
            placeholder="45"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Campus Center swipes used this week:</Text>
          <TextInput
            style={styles.input}
            value={usedCampusCenterSwipes}
            onChangeText={setUsedCampusCenterSwipes}
            placeholder="1"
            keyboardType="numeric"
          />
        </View>
        {weeksLeft && usedSwipes && (
          <View style={styles.trackingResults}>
            <Text style={styles.trackingText}>
              📈 You need to eat {getRecommendedWeeklyEating()} times per week to get full value.
            </Text>
            <Text style={styles.trackingText}>
              💰 Remaining value: ~${(selectedPlan.totalCost - (parseInt(usedSwipes) * ((standardPrices.breakfast + standardPrices.lunch + standardPrices.dinner) / 3))).toFixed(0)}
            </Text>
            <Text style={styles.trackingText}>
              🎫 Campus Center swipes remaining this week: {2 - (parseInt(usedCampusCenterSwipes) || 0)}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderSwipesTracking = () => (
    <View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Swipes used so far:</Text>
        <TextInput
          style={styles.input}
          value={usedSwipes}
          onChangeText={setUsedSwipes}
          placeholder="78"
          keyboardType="numeric"
        />
      </View>
      {usedSwipes && weeksLeft && (
        <View style={styles.trackingResults}>
          <Text style={styles.trackingText}>
            📈 You need to eat {getRecommendedWeeklyEating()} times per week to use all swipes.
          </Text>
          <Text style={styles.trackingText}>
            💰 Remaining swipe value: ~${getRemainingValue().swipes.toFixed(0)}
          </Text>
        </View>
      )}
    </View>
  );

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
          <Text style={styles.modalTitle}>💰 Meal Plan Calculator</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Plan Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔽 Select Your Plan:</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setPlanSelectorVisible(!planSelectorVisible)}
            >
              <Text style={styles.dropdownText}>
                {selectedPlan ? selectedPlan.name : "Choose your meal plan..."}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {planSelectorVisible && (
              <ScrollView 
                style={styles.dropdownOptions}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {mealPlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setSelectedPlan(plan);
                      setPlanSelectorVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{plan.name}</Text>
                    <Text style={styles.dropdownOptionDesc}>{plan.description}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Plan Analysis */}
          {selectedPlan && (
            <View style={styles.section}>
              <Text style={styles.analysisTitle}>📊 {selectedPlan.name} Summary</Text>
              
              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>🟢 Total Paid: ${selectedPlan.totalCost}</Text>
                
                {selectedPlan.swipes === 0 && renderCardinalPlanSummary()}
                
                {selectedPlan.swipes !== undefined && selectedPlan.swipes > 0 && renderSwipesTracking()}
                
                {(selectedPlan.swipes === undefined || selectedPlan.swipes === null) && selectedPlan.diningDollars && renderDiningDollarsOnlySummary()}
              </View>

              <View style={styles.pricesBox}>
                <Text style={styles.pricesTitle}>💡 Standard Prices:</Text>
                <Text style={styles.priceText}>- Breakfast: ${standardPrices.breakfast}</Text>
                <Text style={styles.priceText}>- Lunch: ${standardPrices.lunch}</Text>
                <Text style={styles.priceText}>- Dinner: ${standardPrices.dinner}</Text>
              </View>

              {selectedPlan.swipes === 0 && renderCardinalValueBox()}

              {selectedPlan.swipes !== undefined && selectedPlan.swipes > 0 && renderSwipesValueBox()}

              {(selectedPlan.swipes === undefined || selectedPlan.swipes === null) && selectedPlan.diningDollars && renderDiningDollarsValueBox()}

              {renderPlanDescription()}
            </View>
          )}

          {/* Usage Tracker */}
          {selectedPlan && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Track Your Progress</Text>
              
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Weeks left in semester:</Text>
                <TextInput
                  style={styles.input}
                  value={weeksLeft}
                  onChangeText={setWeeksLeft}
                  placeholder="5"
                  keyboardType="numeric"
                />
              </View>

              {selectedPlan.swipes === 0 && renderCardinalTracking()}

              {selectedPlan.swipes !== undefined && selectedPlan.swipes > 0 && renderSwipesTracking()}
            </View>
          )}

          {/* Dining Dollars Tracker */}
          {selectedPlan && selectedPlan.diningDollars && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💳 Dining Dollars</Text>
              
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Dining Dollars used:</Text>
                <TextInput
                  style={styles.input}
                  value={usedDiningDollars}
                  onChangeText={setUsedDiningDollars}
                  placeholder="52"
                  keyboardType="numeric"
                />
              </View>

              {usedDiningDollars && (
                <View style={styles.dollarsBox}>
                  <Text style={styles.dollarsText}>
                    💳 Dining Dollars Left: ${getRemainingValue().dollars.toFixed(2)}
                  </Text>
                  <Text style={styles.reminderText}>
                    🕔 Reminder: Dining Dollars reset at semester end (use them or lose them!)
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fff',
    maxHeight: 300,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownOptionDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary.main,
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  pricesBox: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  pricesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#856404',
  },
  priceText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 2,
  },
  valueBox: {
    backgroundColor: '#d1ecf1',
    padding: 15,
    borderRadius: 8,
  },
  valueText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#0c5460',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  trackingResults: {
    backgroundColor: '#d4edda',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  trackingText: {
    fontSize: 14,
    color: '#155724',
    marginBottom: 5,
  },
  dollarsBox: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  dollarsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#721c24',
  },
  descriptionBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary.main,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
});
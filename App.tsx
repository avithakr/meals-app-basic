import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { Ionicons } from '@expo/vector-icons';

export interface Meal {
  id: string;
  categoryIds: string[];
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  servings: number;
}

export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverviewScreen: { categoryId: string; categoryName: string };
  MealDetailScreen: { item: Meal };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MealsCategories">
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{ title: 'All Categories' }}
          />
          <Stack.Screen
            name="MealDetailScreen"
            component={MealDetailScreen}
            options={{ title: 'Meal Details', headerRight: () => <Ionicons name="heart" size={20} color="#ff0019" /> }}
          />
          <Stack.Screen
            name="MealsOverviewScreen"
            component={MealsOverviewScreen}
            options={{ title: 'Meal Overview' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});

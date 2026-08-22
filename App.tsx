import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsListScreen from './screens/MealsListScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesContextProvider from './store/context/favorites-context';
import FavoriteMealScreen from './screens/FavoriteMealScreen';
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
  MealsListScreen: { categoryId: string; categoryName: string };
  MealDetailScreen: { item: Meal };
};

export type FavoriteStackParamList = {
  FavoriteMealScreen: undefined;
};

export type RootDrawerParamList = {
  Meals: NavigatorScreenParams<RootStackParamList>;
  FavoriteMealStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const FavoriteStack = createNativeStackNavigator<FavoriteStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function MealsStack() {
  return (
    <Stack.Navigator initialRouteName="MealsCategories">
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Stack.Screen
        name="MealDetailScreen"
        component={MealDetailScreen}
      />
      <Stack.Screen
        name="MealsListScreen"
        component={MealsListScreen}
        options={{ title: 'Meal Overview' }}
      />
    </Stack.Navigator>
  );
}

function FavoriteMealStack() {
  return (
    <FavoriteStack.Navigator initialRouteName='FavoriteMealScreen'>
      <FavoriteStack.Screen
        name='FavoriteMealScreen'
        component={FavoriteMealScreen}
        options={{
          title: "Favorites Meal",
          headerLeft: () => <DrawerToggleButton />
        }} />
    </FavoriteStack.Navigator>)
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Meals"
              component={MealsStack}
              options={{
                title: 'All Meals', headerShown: false, drawerIcon: ({ color, size }) => (
                  <Ionicons name="restaurant" color={color} size={size} />
                )
              }}

            />
            <Drawer.Screen
              name='FavoriteMealStack'
              component={FavoriteMealStack}
              options={{
                title: 'Favorite Meal', headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="heart" color={color} size={size} />
                )
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
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

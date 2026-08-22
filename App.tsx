import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from "./store/context/favorites-context"

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
  AuthScreen: undefined;
  MealsOverviewScreen: { categoryId: string; categoryName: string };
  MealDetailScreen: { item: Meal };
};

type RootDrawerParamList = {
  Meals: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function MealsStack() {
  return (
    <Stack.Navigator
      initialRouteName="MealsCategories"
    >
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
        options={{
          title: 'Meal Details',
          headerRight: () => <Ionicons name="heart" size={20} color="#ff0019" />,
        }}
      />
      <Stack.Screen
        name="MealsOverviewScreen"
        component={MealsOverviewScreen}
        options={{ title: 'Meal Overview' }}
      />
    </Stack.Navigator>
  );
}

const AuthScreen = () => <Text>Auth</Text>

function AuthStack() {
  return <Stack.Navigator initialRouteName='AuthScreen'>
    <Stack.Screen 
      name='AuthScreen' 
      component={AuthScreen}        
      options={{
          title: 'Authentication',
          headerLeft: () => <DrawerToggleButton />,
        }}/>
  </Stack.Navigator>
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
              options={{ title: 'Meals', headerShown: false }}
            />
            <Drawer.Screen
              name="Auth"
              component={AuthStack}
              options={{ title: 'Login', headerShown: false }}
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

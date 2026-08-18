import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRoute, type RouteProp } from '@react-navigation/native'
import data from "../data/meals.json"
import type { Navigation } from './CategoriesScreen';

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

interface MealTileProps {
  meal: Meal;
  onPress: () => void
}

type RootStackParamList = {
    MealsOverviewScreen: { categoryId: string };
}

type MealsOverviewScreenRouteProp = RouteProp<RootStackParamList, 'MealsOverviewScreen'>;

const MealsOverviewScreen = ({navigation}: Navigation) => {
    const route = useRoute<MealsOverviewScreenRouteProp>();
    const { categoryId } = route.params;

 const getMealsByCategoryId = (
  meals: Meal[],
  categoryId: string
): Meal[] => {
  return meals.filter((meal) => meal.categoryIds.includes(categoryId));
};

const meals = getMealsByCategoryId(data.meals, categoryId)

const handleOnPress = (item: Meal) => {
    navigation.navigate("MealDetailScreen", {item})
}

const MealTile = ({ meal, onPress }: MealTileProps) => {

  return (
    <View style={styles.mealContainer}>
      <Text style={styles.title}>{meal.name}</Text>
      <Pressable onPress={onPress}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      </Pressable>
    </View>
  )
}

  return (
    <View style={styles.container}>
        <FlatList 
            keyExtractor={(item, index) => `${item.name}-${index}`} 
            data={meals} 
            renderItem={({item}) => <MealTile meal={item} onPress={() => handleOnPress(item)} />} 

        />
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    mealContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
})
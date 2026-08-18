import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useRoute, type RouteProp } from '@react-navigation/native'
import data from "../data/meals.json"
import MealTile, { type Meal } from '../components/MealTile';

type RootStackParamList = {
    MealsOverviewScreen: { categoryId: string };
}

type MealsOverviewScreenRouteProp = RouteProp<RootStackParamList, 'MealsOverviewScreen'>;

const MealsOverviewScreen = () => {
    const route = useRoute<MealsOverviewScreenRouteProp>();
    const { categoryId } = route.params;

 const getMealsByCategoryId = (
  meals: Meal[],
  categoryId: string
): Meal[] => {
  return meals.filter((meal) => meal.categoryIds.includes(categoryId));
};

const meals = getMealsByCategoryId(data.meals, categoryId)

  return (
    <View style={styles.container}>
        <FlatList 
            keyExtractor={(item, index) => `${item.name}-${index}`} 
            data={meals} 
            renderItem={({item}) => <MealTile meal={item} />} 

        />
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})
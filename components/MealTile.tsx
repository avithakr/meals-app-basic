import { View, Text, Image, StyleSheet } from 'react-native'

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
}

interface MealTileProps {
  meal: Meal;
}

const MealTile = ({ meal }: MealTileProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal.name}</Text>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
    </View>
  )
}

export default MealTile

const styles = StyleSheet.create({
  container: {
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
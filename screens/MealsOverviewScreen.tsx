import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRoute, type RouteProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
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
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.mealContainer,
          pressed && styles.mealContainerPressed,
        ]}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {meal.name}
          </Text>

          {/* Metadata Row */}
          <View style={styles.metaRow}>
            {meal.duration && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.metaText}>{meal.duration} min</Text>
              </View>
            )}
            {meal.complexity && (
              <View style={styles.metaItem}>
                <Ionicons name="flame-outline" size={16} color="#FF9500" />
                <Text style={styles.metaText}>{meal.complexity}</Text>
              </View>
            )}
            {meal.affordability && (
              <View style={styles.metaItem}>
                <Ionicons name="cash-outline" size={16} color="#4CAF50" />
                <Text style={styles.metaText}>{meal.affordability}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Arrow Icon */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>
      </Pressable>
    );
  };

    return (
      <View style={styles.container}>
        <FlatList
          data={meals}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <MealTile meal={item} onPress={() => handleOnPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    listContent: {
      padding: 16,
      paddingBottom: 32,
    },
    mealContainer: {
      backgroundColor: 'white',
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    mealContainerPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
    imageContainer: {
      width: '100%',
      height: 200,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      backgroundColor: '#e0e0e0',
    },
    imageOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    contentContainer: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 12,
      lineHeight: 24,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metaText: {
      fontSize: 13,
      color: '#666',
      textTransform: 'capitalize',
    },
    arrowContainer: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
    }
})
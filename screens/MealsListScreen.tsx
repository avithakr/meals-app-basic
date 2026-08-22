import { FlatList, StyleSheet, View } from 'react-native';
import data from '../data/meals.json';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Meal, RootStackParamList } from '../App';
import MealTile from '../components/MealTile';

type MealsListScreenProps = NativeStackScreenProps<RootStackParamList, 'MealsListScreen'>;

const MealsListScreen = ({ navigation, route }: MealsListScreenProps) => {
  const { categoryId } = route.params;

  const getMealsByCategoryId = (meals: Meal[], categoryId: string): Meal[] => {
    return meals.filter((meal) => meal.categoryIds.includes(categoryId));
  };

  const meals = getMealsByCategoryId(data.meals, categoryId);

  const handleOnPress = (item: Meal) => {
    navigation.navigate('MealDetailScreen', { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <MealTile meal={item} onPress={() => handleOnPress(item)} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MealsListScreen;

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
  },
});

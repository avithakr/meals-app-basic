import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { FavoritesContext } from '../store/context/favorites-context';
import mealsData from "../data/meals.json"
import MealTile from '../components/MealTile';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FavoriteStackParamList, Meal, RootDrawerParamList } from '../App';

type FavoriteMealScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FavoriteStackParamList, 'FavoriteMealScreen'>,
  DrawerScreenProps<RootDrawerParamList>
>;


const FavoriteMealScreen = ({ navigation }: FavoriteMealScreenProps) => {
  const { ids } = useContext(FavoritesContext);
  const favoriteMeals = mealsData.meals.filter((meal) => ids.includes(meal.id));

  const handleMealPress = (item: Meal) => {
    navigation.navigate('Meals', {
      screen: 'MealDetailScreen',
      params: { item },
    });
  }

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet!</Text>
        <Text style={styles.emptySubtext}>
          Start adding meals to your favorites
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealTile meal={item} onPress={() => handleMealPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default FavoriteMealScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
});

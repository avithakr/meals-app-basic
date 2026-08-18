import { FlatList, StyleSheet, View, Text, StatusBar } from 'react-native';
import mealsData from '../data/meals.json';
import CategoryGridTile, { type Category } from '../components/CategoryGridTile';

export interface Navigation {
  navigation: { navigate: (screen: string, params?: any) => void };
}

const CategoriesScreen = ({ navigation }: Navigation) => {
  const { categories } = mealsData;

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('MealsOverviewScreen', { categoryId, categoryName });
  };

  const renderCategoryTiles = ({ item }: { item: Category }) => {
    return (
      <CategoryGridTile {...item} onCategoryPress={() => handleCategoryPress(item.id, item.name)} />
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Optional Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Categories</Text>
        <Text style={styles.headerSubtitle}>Choose a category to explore delicious recipes</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryTiles}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#351401',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

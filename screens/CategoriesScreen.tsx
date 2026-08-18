import { FlatList, StyleSheet, View } from "react-native";
import mealsData from "../data/meals.json";
import CategoryGridTile, { type Category } from "../components/CategoryGridTile";

export interface Navigation{
  navigation: { navigate: (screen: string, params?: any) => void }
}

const CategoriesScreen = ({ navigation }: Navigation) => {
  const { categories } = mealsData;

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('MealsOverviewScreen', {categoryId})
  }

  const renderCategoryTiles = (item: Category) => {
  return (
    <View style={styles.categoryContainer}>
      <CategoryGridTile
        {...item}
        onCategoryPress={() => handleCategoryPress(item.id)}
      />
    </View>
  );
};

  return (
    <FlatList
      data={categories}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item }) => renderCategoryTiles(item)}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    margin: 8,
    maxWidth: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

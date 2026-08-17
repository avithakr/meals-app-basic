import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import mealsData from "../data/meals.json";
import CategoryGridTile from "../components/CategoryGridTile";

const renderCategoryTiles = (item) => {
  return (
    <View style={styles.categoryContainer}>
      <CategoryGridTile
        id={item.id}
        name={item.name}
        icon={item.icon}
        color={item.color}
      />
    </View>
  );
};

const CategoriesScreen = () => {
  const { categories } = mealsData;
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

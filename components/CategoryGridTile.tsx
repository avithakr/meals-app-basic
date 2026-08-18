import { Pressable, StyleSheet, Text, View } from "react-native";
  export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
  }
  interface CategoryGridTileProps extends Category {
    onCategoryPress: () => void;
  }

const CategoryGridTile = ({ name, color, icon, onCategoryPress }: CategoryGridTileProps) => {

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Pressable
        onPress={onCategoryPress}
        android_ripple={{ color: "#b2a4ef" }}
        style={({ pressed }) => [
          styles.categoryContainer,
          pressed && styles.pressedItem,
        ]}
      >
        <Text style={styles.categoryText}>{name}</Text>
        <Text style={styles.categoryIcon}>{icon}</Text>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 8,
    margin: 8,
    padding: 8,
    elevation: 4,
  },
  categoryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  categoryIcon: {
    fontSize: 48,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

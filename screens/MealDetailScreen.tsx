import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { Meal } from './MealsOverviewScreen';

type MealDetailRouteProp = RouteProp<{ MealDetail: { item: Meal } }, 'MealDetail'>;

const MealDetailScreen = () => {
  const route = useRoute<MealDetailRouteProp>();
  const { item } = route.params;
  const { ingredients, steps, imageUrl, name, description, duration, complexity, servings } = item;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <Image source={{ uri: imageUrl }} style={styles.heroImage} />

      {/* Title & Info Card */}
      <View style={styles.headerCard}>
        <Text style={styles.mainTitle}>{name}</Text>

        {description && <Text style={styles.description}>{description}</Text>}

        {/* Meta Info Row */}
        <View style={styles.metaRow}>
          {duration && (
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color="#007AFF" />
              <Text style={styles.metaText}>{duration} min</Text>
            </View>
          )}
          {complexity && (
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={20} color="#FF9500" />
              <Text style={styles.metaText}>{complexity}</Text>
            </View>
          )}
          {servings && (
            <View style={styles.metaItem}>
              <Ionicons name="restaurant-outline" size={20} color="#4CAF50" />
              <Text style={styles.metaText}>{servings} servings</Text>
            </View>
          )}
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🥘</Text>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{ingredients.length}</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.checkbox}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Steps Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>👨‍🍳</Text>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{steps.length}</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
  },
  headerCard: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
});

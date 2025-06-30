import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/src/components/ui/Text';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Place = { id: string; name: string; description: string };

const placesByCategory: Record<string, Place[]> = {
  Markets: [
    { id: '1', name: 'Fresh Market', description: 'Groceries and more' },
    { id: '2', name: 'SuperMart', description: 'Everything you need' },
  ],
  Restaurants: [
    { id: '3', name: 'Pizza Palace', description: 'Best pizza in town' },
    { id: '4', name: 'Sushi World', description: 'Fresh sushi and rolls' },
  ],
  Apteks: [
    { id: '5', name: 'Health Pharmacy', description: 'Medicines and health products' },
    { id: '6', name: 'City Aptek', description: 'Open 24/7' },
  ],
  Electronics: [
    { id: '7', name: 'Tech Store', description: 'Latest gadgets' },
    { id: '8', name: 'ElectroShop', description: 'Electronics and accessories' },
  ],
  Zoomarkets: [
    { id: '9', name: 'Pet World', description: 'All for your pets' },
    { id: '10', name: 'ZooMarket', description: 'Pet food and toys' },
  ],
};

export default function CategoryPlacesPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const categoryName = Object.keys(placesByCategory).find(
    key => key.toLowerCase() === (id || '').toLowerCase()
  );
  const places: Place[] = categoryName ? placesByCategory[categoryName] : [];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backwardButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backwardButtonIcon}>&lt;</Text>
        </TouchableOpacity>
        <Text variant="h3" weight="bold" style={styles.title}>
          {categoryName || 'Category'} Places
        </Text>
      </View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.placeItem}>
            <Text variant="body" weight="semibold">{item.name}</Text>
            <Text variant="caption" color="gray">{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text variant="body" color="gray" style={{ marginTop: 32 }}>
            No places found for this category.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 0,
    marginLeft: 16,
    fontSize: 24,
    flexShrink: 1,
  },
  backwardButton: {
    backgroundColor: '#FF5A1F',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backwardButtonIcon: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  placeItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 8,
  },
});
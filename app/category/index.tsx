import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@/src/components/ui/Text';
import { mockCategories } from '@/src/data/mockData';
import { useRouter } from 'expo-router';

export default function CategoryListPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="h3" weight="bold" style={styles.title}>
        Categories
      </Text>
      <FlatList
        data={mockCategories}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => router.push({ pathname: '/category/[id]', params: { id: item.name } })}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text variant="body" weight="semibold" style={styles.name}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 22,
  },
  name: {
    fontSize: 16,
  },
});
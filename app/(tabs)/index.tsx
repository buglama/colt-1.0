import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MapPin, Filter, ShoppingBag } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Text from '@/src/components/ui/Text';
import RestaurantCard from '@/src/components/restaurant/RestaurantCard';
import ProductCard from '@/src/components/restaurant/ProductCard';
import { colors } from '@/src/constants/theme';
import { Restaurant, Product, Category } from '@/src/types';
import { mockRestaurants, mockFeaturedProducts, mockCategories } from '@/src/data/mockData';
import { useCart } from '@/src/context/CartContext';

export default function HomeScreen() {
  const router = useRouter();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(mockFeaturedProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(restaurant =>
      restaurant.categories.includes(selectedCategory))
    : restaurants;

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem,
      ]}
      onPress={() => {
        setSelectedCategory(selectedCategory === item.name ? null : item.name);
      }}
    >
      <View
        style={[
          styles.categoryIconContainer,
          selectedCategory === item.name && styles.selectedCategoryIconContainer,
        ]}
      >
        <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
      </View>
      <Text
        variant="caption"
        color={selectedCategory === item.name ? 'primary' : 'textSecondary'}
        weight={selectedCategory === item.name ? 'semibold' : 'regular'}
        style={styles.categoryName}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const navigateToCart = () => {
    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={18} color={colors.primary} />
            <Text variant="body2" weight="medium" style={styles.locationText}>
              Delivering to
            </Text>
            <TouchableOpacity>
              <Text variant="body2" weight="semibold" color="primary">
                Current Location ▼
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for restaurants or dishes"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Featured Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredProductsContainer}
          >
            {featuredProducts.map((product, index) => (
              <Animated.View
                key={product.id}
                entering={FadeInDown.delay(index * 100).springify()}
                style={styles.featuredProductItem}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: '/restaurant/[id]/product/[productId]',
                      params: {
                        id: product.restaurantId!,
                        productId: product.id!,
                      },
                    })
                  }
                >
                  <View style={styles.featuredProductCard}>
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.featuredProductImage}
                      resizeMode="cover"
                    />
                    <View style={styles.featuredProductContent}>
                      <Text variant="body2" weight="semibold" numberOfLines={1}>
                        {product.name}
                      </Text>
                      <Text variant="caption" color="textSecondary" numberOfLines={1}>
                        {product.restaurant}
                      </Text>
                      <Text variant="body2" weight="semibold" color="primary">
                        ${product.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Popular Restaurants
          </Text>
          {filteredRestaurants.map((restaurant, index) => (
            <Animated.View
              key={restaurant.id}
              entering={FadeInDown.delay(index * 100).springify()}
            >
              <RestaurantCard restaurant={restaurant} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {cart.items.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={navigateToCart}
          activeOpacity={0.9}
        >
          <View style={styles.cartButtonContent}>
            <View style={styles.cartInfo}>
              <ShoppingBag size={22} color="white" />
              <View style={styles.cartBadge}>
                <Text variant="caption" weight="bold" color="white">
                  {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                </Text>
              </View>
            </View>
            <Text variant="body" weight="semibold" color="white">
              View Cart
            </Text>
            <Text variant="body" weight="bold" color="white">
              ${cart.total.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 4,
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategoryIconContainer: {
    backgroundColor: colors.primaryLight,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    textAlign: 'center',
  },
  selectedCategoryItem: {
    opacity: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  featuredProductsContainer: {
    paddingRight: 16,
  },
  featuredProductItem: {
    marginRight: 16,
    width: 160,
  },
  featuredProductCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredProductImage: {
    width: '100%',
    height: 120,
  },
  featuredProductContent: {
    padding: 12,
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: colors.secondary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
  },
});
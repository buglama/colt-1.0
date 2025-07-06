import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Dimensions
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

const offerImages = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=800&q=80',
    title: 'İlk sifarişdə 20% endirim!',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=800&q=80',
    title: 'Bu həftə sonu xüsusi endirimlər',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&w=800&q=80',
    title: 'Bir ödə, birini pulsuz al!',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=800&q=80',
    title: 'Sürətli çatdırılma + 10% endirim',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=800&q=80',
    title: 'Yeni menyu təqdimatı - 15% endirim',
  },
];

const popularRestaurants = [
  {
    id: 'kfc',
    name: 'KFC',
    imageUrl: 'https://mma.prnewswire.com/media/2263790/KFC_Logo.jpg?p=publish',
  },
  {
    id: 'mcdonalds',
    name: 'McDonald\'s',
    imageUrl: 'https://hipfonts.com/wp-content/uploads/2022/08/McDonalds-logo-cover.jpg',
  },
  {
    id: 'byhollywood',
    name: 'By Hollywood',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L11GAEDpwJ-wjtzqcyvnoL5Zc5jbdJk2pg&s',
  },
  {
    id: 'shaurma_no1',
    name: 'Shaurma No1',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2utlHhHObilp_KIOEVKpPOm_iROgLEPJrYg&s',
  },
  {
    id: 'borani',
    name: 'Borani',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg6YrfolWPXiQAQIz0s473J174_G0za4lwA&s',
  },
];


const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_ITEM_HEIGHT = 200;
const CAROUSEL_ITEM_RADIUS = 8;

export default function HomeScreen() {
  const router = useRouter();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(mockFeaturedProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const filteredRestaurants = restaurants;

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem,
      ]}
      onPress={() => router.push({ pathname: '/category/[id]', params: { id: item.name } })}
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const navigateToCart = () => {
    router.push('/cart');
  };

  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === offerImages.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      if (currentIndex === 0) {
        scrollRef.current.scrollTo({ x: 0, animated: false });
      } else {
        scrollRef.current.scrollTo({
          x: currentIndex * (SCREEN_WIDTH - 32),
          animated: true,
        });
      }
    }
  }, [currentIndex]);

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
            <TouchableOpacity>
              <Text variant="body2" weight="semibold" color="primary">
                Hazırki məkana ▼
              </Text>
            </TouchableOpacity>
            <Text variant="body2" weight="medium" style={styles.locationText}>
              Çatdırılır
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Restoran və ya məhsul axtar"
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

        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={styles.carouselScroll}
            contentContainerStyle={{}}
          >
            {offerImages.map((offer) => (
              <View
                key={offer.id}
                style={[
                  styles.carouselItem,
                  {
                    width: SCREEN_WIDTH - 32,
                    height: CAROUSEL_ITEM_HEIGHT,
                  },
                ]}
              >
                <Image
                  source={{ uri: offer.image }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                <View style={styles.carouselOverlay}>
                  <Text
                    variant="h4"
                    weight="bold"
                    color="white"
                    style={styles.carouselText}
                  >
                    {offer.title}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Populyar Restoranlar
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredProductsContainer}
          >
            {popularRestaurants.map((restaurant, index) => (
              <Animated.View
                key={restaurant.id}
                entering={FadeInDown.delay(index * 100).springify()}
                style={styles.featuredProductItem}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: '/restaurant/[id]',
                      params: {
                        id: restaurant.id,
                      },
                    })
                  }
                >
                  <View style={styles.featuredProductCard}>
                    <Image
                      source={{ uri: restaurant.imageUrl }}
                      style={styles.featuredProductImage}
                      resizeMode="cover"
                    />
                    <View style={styles.featuredProductContent}>
                      <Text variant="body2" weight="semibold" numberOfLines={1}>
                        {restaurant.name}
                      </Text>
                      <Text variant="caption" color="textSecondary" numberOfLines={1}>
                        Popular
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
  carouselContainer: {
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: CAROUSEL_ITEM_RADIUS,
    overflow: 'hidden',
  },
  carouselScroll: {
    borderRadius: CAROUSEL_ITEM_RADIUS,
  },
  carouselItem: {
    position: 'relative',
    backgroundColor: colors.gray100,
    overflow: 'hidden',
  },
  carouselOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 12,
  },
  carouselText: {
    color: '#fff',
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
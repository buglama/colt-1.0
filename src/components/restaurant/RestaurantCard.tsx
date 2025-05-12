import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/src/components/ui/Text';
import Card from '@/src/components/ui/Card';
import { Clock, Star } from 'lucide-react-native';
import { colors } from '@/src/constants/theme';
import { Restaurant } from '@/src/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();

  const navigateToRestaurant = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={navigateToRestaurant}>
      <Card style={styles.container}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {restaurant.discount && (
          <View style={styles.discountBadge}>
            <Text variant="caption" weight="semibold" color="white">
              {restaurant.discount}
            </Text>
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="h4" weight="semibold" numberOfLines={1} style={styles.name}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.yellow} fill={colors.yellow} />
              <Text variant="body2" weight="medium" style={styles.rating}>
                {restaurant.rating}
              </Text>
            </View>
          </View>
          <Text variant="body2" color="textSecondary" numberOfLines={1}>
            {restaurant.categories.join(' • ')}
          </Text>
          <View style={styles.footer}>
            <View style={styles.infoItem}>
              <Clock size={14} color={colors.textSecondary} />
              <Text variant="caption" color="textSecondary" style={styles.infoText}>
                {restaurant.deliveryTime} min
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text variant="caption" color="textSecondary" style={styles.infoText}>
                {restaurant.distance} km
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text variant="caption" color="textSecondary" style={styles.infoText}>
                {restaurant.deliveryFee === 0 
                  ? 'Free delivery' 
                  : `$${restaurant.deliveryFee.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    marginLeft: 4,
  },
});
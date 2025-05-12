import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/src/components/ui/Text';
import Card from '@/src/components/ui/Card';
import { colors } from '@/src/constants/theme';
import { Product } from '@/src/types';

interface ProductCardProps {
  product: Product;
  restaurantId: string;
}

export default function ProductCard({ product, restaurantId }: ProductCardProps) {
  const router = useRouter();

  const navigateToProduct = () => {
    router.push(`/restaurant/${restaurantId}/product/${product.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={navigateToProduct} style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text variant="body" weight="semibold" numberOfLines={2} style={styles.title}>
              {product.name}
            </Text>
            <Text variant="body2" color="textSecondary" numberOfLines={2} style={styles.description}>
              {product.description}
            </Text>
            <View style={styles.priceContainer}>
              <Text variant="body" weight="semibold" color="primary">
                ${product.price.toFixed(2)}
              </Text>
              {product.originalPrice && (
                <Text 
                  variant="caption" 
                  color="textSecondary" 
                  style={styles.originalPrice}
                >
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
          </View>
          {product.imageUrl && (
            <Image 
              source={{ uri: product.imageUrl }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          )}
        </View>
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text variant="caption" weight="semibold" color="white">
              {product.discount}
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
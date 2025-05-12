import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Text from '@/src/components/ui/Text';
import Button from '@/src/components/ui/Button';
import { colors } from '@/src/constants/theme';
const { width, height } = useWindowDimensions();

const slides = [
  {
    id: '1',
    title: 'Order Delicious Food',
    description:
      'Choose from a wide variety of restaurants and get your favorite food delivered to your doorstep.',
    image:
      'https://images.pexels.com/photos/4224305/pexels-photo-4224305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Earn Cashback',
    description: 'Get cashback on every order you place. The more you order, the more you earn.',
    image:
      'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Refer Friends',
    description:
      'Invite friends to join and earn cashback when they place orders. Build your referral network!',
    image:
      'https://images.pexels.com/photos/5921469/pexels-photo-5921469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: Array<{ index?: number } | { key: string }> }) => {
      const viewableItem = viewableItems.find(item => 'index' in item);
      if (viewableItem && 'index' in viewableItem && viewableItem.index !== undefined) {
        setCurrentIndex(viewableItem.index);
      }
    }
  ).current;

  const navigateToLogin = () => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(-30, { duration: 300 });
    setTimeout(() => {
      router.replace('/login'); // replace ilə onboarding geri qayıtmasın
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      navigateToLogin();
    }
  };

  const handleSkip = () => {
    navigateToLogin();
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={{ uri: item.image }} style={[styles.image, { height: height * 0.6 }]} />
      <View style={styles.content}>
        <Text variant="h2" weight="bold" style={styles.title}>
          {item.title}
        </Text>
        <Text variant="body" style={styles.description}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Skip"
          variant="ghost"
          onPress={handleSkip}
          style={styles.skipButton}
        />
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  slide: {
    width,
    flex: 1,
  },
  image: {
    width: '100%',
    height: height * 0.6,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    color: colors.primary,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gray300,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  skipButton: {
    width: 100,
  },
  nextButton: {
    width: 150,
  },
});
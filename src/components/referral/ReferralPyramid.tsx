import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';
import { ReferralUser } from '@/src/types';

interface ReferralPyramidProps {
  referralChain: ReferralUser[];
}

export default function ReferralPyramid({ referralChain }: ReferralPyramidProps) {
  const screenWidth = Dimensions.get('window').width;
  const pyramidWidth = screenWidth - 48;
  const pyramidHeight = 200;
  
  const level1Opacity = useSharedValue(0);
  const level2Opacity = useSharedValue(0);
  const level3Opacity = useSharedValue(0);
  
  const level1Scale = useSharedValue(0.5);
  const level2Scale = useSharedValue(0.5);
  const level3Scale = useSharedValue(0.5);

  React.useEffect(() => {
    // Animate the pyramid levels with a staggered effect
    level1Opacity.value = withTiming(1, { duration: 600 });
    level1Scale.value = withTiming(1, { duration: 600 });
    
    level2Opacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    level2Scale.value = withDelay(200, withTiming(1, { duration: 600 }));
    
    level3Opacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    level3Scale.value = withDelay(400, withTiming(1, { duration: 600 }));
  }, []);

  const level1Style = useAnimatedStyle(() => {
    return {
      opacity: level1Opacity.value,
      transform: [{ scale: level1Scale.value }],
    };
  });

  const level2Style = useAnimatedStyle(() => {
    return {
      opacity: level2Opacity.value,
      transform: [{ scale: level2Scale.value }],
    };
  });

  const level3Style = useAnimatedStyle(() => {
    return {
      opacity: level3Opacity.value,
      transform: [{ scale: level3Scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.pyramidContainer}>
        <Animated.View 
          style={[
            styles.level, 
            styles.level3,
            { width: pyramidWidth * 0.65, height: pyramidHeight / 3 },
            level3Style
          ]}
        >
          <Text variant="caption" weight="semibold" color="white" style={styles.levelText}>
            Level 3 (You) - 3%
          </Text>
          <Text variant="caption" color="white" numberOfLines={1} style={styles.nameText}>
            {referralChain[2]?.name || 'You'}
          </Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.level, 
            styles.level2,
            { width: pyramidWidth * 0.8, height: pyramidHeight / 3 },
            level2Style
          ]}
        >
          <Text variant="caption" weight="semibold" color="white" style={styles.levelText}>
            Level 2 - 2%
          </Text>
          <Text variant="caption" color="white" numberOfLines={1} style={styles.nameText}>
            {referralChain[1]?.name || 'Direct Referrer'}
          </Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.level, 
            styles.level1,
            { width: pyramidWidth, height: pyramidHeight / 3 },
            level1Style
          ]}
        >
          <Text variant="caption" weight="semibold" color="white" style={styles.levelText}>
            Level 1 - 1%
          </Text>
          <Text variant="caption" color="white" numberOfLines={1} style={styles.nameText}>
            {referralChain[0]?.name || 'Indirect Referrer'}
          </Text>
        </Animated.View>
      </View>
      
      <View style={styles.legendContainer}>
        <Text variant="body2" weight="semibold" style={styles.legendTitle}>
          How Cashback Works
        </Text>
        <Text variant="caption" color="textSecondary" style={styles.legendText}>
          When you place an order, cashback is distributed across all three levels:
        </Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text variant="body2">
            You receive 3% cashback
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
          <Text variant="body2">
            Your direct referrer receives 2%
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.tertiary }]} />
          <Text variant="body2">
            Your indirect referrer receives 1%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  pyramidContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'flex-end',
  },
  level: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  level1: {
    backgroundColor: colors.tertiary,
    zIndex: 1,
  },
  level2: {
    backgroundColor: colors.secondary,
    zIndex: 2,
  },
  level3: {
    backgroundColor: colors.primary,
    zIndex: 3,
  },
  levelText: {
    textAlign: 'center',
  },
  nameText: {
    textAlign: 'center',
    maxWidth: '90%',
  },
  legendContainer: {
    marginTop: 32,
    width: '100%',
    padding: 16,
    backgroundColor: colors.gray100,
    borderRadius: 12,
  },
  legendTitle: {
    marginBottom: 8,
  },
  legendText: {
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
});
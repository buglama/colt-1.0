import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors } from '@/src/constants/theme';

interface CardProps extends ViewProps {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  border?: boolean;
  radius?: 'small' | 'medium' | 'large' | 'full';
}

export default function Card({
  children,
  elevation = 'low',
  border = false,
  radius = 'medium',
  style,
  ...props
}: CardProps) {
  const getShadowStyle = () => {
    switch (elevation) {
      case 'none':
        return {};
      case 'low':
        return styles.shadowLow;
      case 'medium':
        return styles.shadowMedium;
      case 'high':
        return styles.shadowHigh;
      default:
        return styles.shadowLow;
    }
  };

  const getBorderRadiusStyle = () => {
    switch (radius) {
      case 'small':
        return styles.radiusSmall;
      case 'medium':
        return styles.radiusMedium;
      case 'large':
        return styles.radiusLarge;
      case 'full':
        return styles.radiusFull;
      default:
        return styles.radiusMedium;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getShadowStyle(),
        getBorderRadiusStyle(),
        border && styles.border,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  border: {
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  shadowLow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowHigh: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
  radiusSmall: {
    borderRadius: 8,
  },
  radiusMedium: {
    borderRadius: 12,
  },
  radiusLarge: {
    borderRadius: 16,
  },
  radiusFull: {
    borderRadius: 9999,
  },
});
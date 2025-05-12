import React from 'react';
import { StyleSheet, Text as NativeText, TextProps as NativeTextProps } from 'react-native';
import { colors } from '@/src/constants/theme';

interface TextProps extends NativeTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body2' | 'caption' | 'button';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: keyof typeof colors | string;
}

export default function Text({
  children,
  variant = 'body',
  weight = 'regular',
  color = 'text',
  style,
  ...props
}: TextProps) {
  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'body':
        return styles.body;
      case 'body2':
        return styles.body2;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  const getWeightStyle = () => {
    switch (weight) {
      case 'regular':
        return styles.regular;
      case 'medium':
        return styles.medium;
      case 'semibold':
        return styles.semibold;
      case 'bold':
        return styles.bold;
      default:
        return styles.regular;
    }
  };

  const getColorStyle = () => {
    if (typeof color === 'string' && color in colors) {
      return { color: colors[color as keyof typeof colors] };
    }
    return { color };
  };

  return (
    <NativeText
      style={[getTextStyle(), getWeightStyle(), getColorStyle(), style]}
      {...props}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
  },
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  semibold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
});
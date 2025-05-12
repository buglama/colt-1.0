import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/src/components/ui/Text';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text>Cart Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
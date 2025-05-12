import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/src/components/ui/Text';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Checkout Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
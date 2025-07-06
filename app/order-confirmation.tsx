import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/src/components/ui/Text';

export default function OrderConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text>Sifariş təstiq ekranı</Text>
      <Text>TEST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Text from '@/src/components/ui/Text';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Restaurant {id}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
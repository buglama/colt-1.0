import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetailPage() {
    const { id, productId } = useLocalSearchParams();

    return (
        <View>
            <Text>Restaurant ID: {id}</Text>
            <Text>Product ID: {productId}</Text>
        </View>
    );
}

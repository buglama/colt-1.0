import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';
import { ChevronLeft } from 'lucide-react-native';

const sampleOrders = [
    {
        id: 1,
        date: '2025-05-10',
        total: '30.00 AZN',
        status: 'Tamamlandı',
    },
    {
        id: 2,
        date: '2025-05-08',
        total: '50.00 AZN',
        status: 'Gözlənilir',
    },
    {
        id: 3,
        date: '2025-05-05',
        total: '25.00 AZN',
        status: 'Tamamlandı',
    },
];

export default function OrderHistoryScreen() {
    const router = useRouter();

    // State to store orders
    const [orders, setOrders] = useState(sampleOrders);

    useEffect(() => {
        // Here you can fetch real order data from your API or state management
        // For now, using the sample orders above
    }, []);

    const handleOrderClick = (orderId: number) => {
        Alert.alert(`Sifariş ${orderId}`, 'Təfərrüatlar tezliklə gələcək!');
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text variant="h3" weight="bold" style={styles.title}>Sifariş tarixçəsi</Text>
                </View>

                <View style={styles.ordersList}>
                    {orders.map((order) => (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderCard}
                            onPress={() => handleOrderClick(order.id)}
                        >
                            <View style={styles.orderDetails}>
                                <Text variant="body" weight="bold" style={styles.orderDate}>
                                    {order.date}
                                </Text>
                                <Text variant="body" weight="medium" style={styles.orderTotal}>
                                    Cəmi: {order.total}
                                </Text>
                                <Text variant="body" weight="medium" style={styles.orderStatus}>
                                    Status: {order.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray100,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        padding: 8,
        backgroundColor: colors.white,
        color: colors.text,
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginLeft: 12,
    },
    ordersList: {
        marginTop: 20,
    },
    orderCard: {
        backgroundColor: colors.white,
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    orderDetails: {
        marginBottom: 12,
    },
    orderDate: {
        fontSize: 16,
        color: colors.primary,
        marginBottom: 4,
    },
    orderTotal: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    orderStatus: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});

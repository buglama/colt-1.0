import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, ChevronRight, PlusCircle } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function PaymentMethodsScreen() {
    const router = useRouter();
    const [paymentMethods, setPaymentMethods] = useState([
        { id: '1', type: 'Kredit kartı', last4: '1234' },
        { id: '2', type: 'Debit kartı', last4: '5678' },
    ]);

    const handleAddPaymentMethod = () => {
        // Navigate to add payment method screen
        router.push('/add-payment-method');
    };

    const handleRemovePaymentMethod = (id: string) => {
        Alert.alert(
            'Ödəniş metodunu silin',
            'Bu ödəniş üsulunu silmək istədiyinizə əminsiniz?',
            [
                { text: 'Ləğv et', style: 'cancel' },
                {
                    text: 'Sil',
                    onPress: () => {
                        setPaymentMethods((prevMethods) =>
                            prevMethods.filter((method) => method.id !== id)
                        );
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text variant="h3" weight="bold" style={styles.title}>
                        Ödəniş Metodları
                    </Text>
                </View>

                <View style={styles.sectionTitle}>
                    <Text variant="h4" weight="semibold">
                        Sənin ödəniş metodların
                    </Text>
                </View>

                <View style={styles.paymentMethodsList}>
                    {paymentMethods.map((method) => (
                        <View key={method.id} style={styles.paymentMethodItem}>
                            <View style={styles.paymentMethodInfo}>
                                <CreditCard size={24} color={colors.primary} />
                                <View style={styles.paymentDetails}>
                                    <Text variant="body" weight="medium">
                                        {method.type}
                                    </Text>
                                    <Text variant="caption" color="textSecondary">
                                        Sonu {method.last4}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemovePaymentMethod(method.id)}
                            >
                                <Text variant="body" weight="semibold" color="danger">
                                    Sil
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.addPaymentMethodButton}
                    onPress={handleAddPaymentMethod}
                >
                    <PlusCircle size={24} color={colors.primary} />
                    <Text variant="body" weight="semibold" color="primary">
                        Yeni ödəniş metodu əlavə et
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray50,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    title: {
        marginBottom: 8,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 24,
    },
    paymentMethodsList: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    paymentMethodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.white,
        marginBottom: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    paymentMethodInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentDetails: {
        marginLeft: 12,
    },
    removeButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: colors.dangerLight,
        borderRadius: 8,
    },
    addPaymentMethodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginHorizontal: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 12,
    },
});

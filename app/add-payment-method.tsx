import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';
import { ChevronLeft } from 'lucide-react-native';

export default function AddPaymentMethodScreen() {
    const router = useRouter();

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSavePaymentMethod = () => {
        if (!cardNumber || !expiryDate || !cvv) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Logic to save payment method

        Alert.alert('Success', 'Payment method added successfully', [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text variant="h3" weight="bold" style={styles.title}>Add Payment Method</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text variant="body" weight="medium" style={styles.inputLabel}>
                        Card Number
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your card number"
                        keyboardType="numeric"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                    />

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text variant="body" weight="medium" style={styles.inputLabel}>
                                Expiry Date
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM/YY"
                                keyboardType="numeric"
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                            />
                        </View>

                        <View style={styles.column}>
                            <Text variant="body" weight="medium" style={styles.inputLabel}>
                                CVV
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="CVV"
                                keyboardType="numeric"
                                secureTextEntry
                                value={cvv}
                                onChangeText={setCvv}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSavePaymentMethod}>
                        <Text variant="body" weight="semibold" color="white">Save Payment Method</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray200,
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
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginLeft: 12,
    },
    formContainer: {
        backgroundColor: colors.white,
        padding: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    inputLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.gray100,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
        color: colors.gray400,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

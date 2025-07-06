import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function WithdrawScreen() {
    const [amount, setAmount] = useState('');
    const currentBalance = 125.75; // Burda istəsən backend-dən çəkmə funksiyası da əlavə edərik

    const handleWithdraw = () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            Alert.alert('Xəta', 'Zəhmət olmasa düzgün məbləğ daxil et.');
            return;
        }

        if (Number(amount) > currentBalance) {
            Alert.alert('Balans kifayət etmir', 'Bu məbləği çıxarmaq üçün balansın kifayət deyil.');
            return;
        }

        Alert.alert('Uğurlu', `${amount} AZN çıxarıldı. ✅`);
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text variant="h3" weight="bold">Çıxarış</Text>
                    <Text variant="body" color="textSecondary" style={{ marginTop: 6 }}>
                        Kəşbek balansınızı hesabınıza köçürün.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text variant="body" weight="medium" style={styles.label}>Mövcud balans</Text>
                    <Text variant="h3" weight="bold" style={styles.balance}>
                        {currentBalance.toFixed(2)} AZN
                    </Text>

                    <Text variant="body" weight="medium" style={styles.label}>Çıxarış məbləği</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="Məsələn 25"
                        keyboardType="numeric"
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
                        <Text variant="body" weight="semibold" style={{ color: '#fff' }}>
                            Çıxarış et
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray50,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        marginTop: 60,
        marginBottom: 24,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3.84,
        elevation: 3,
    },
    label: {
        marginBottom: 6,
        marginTop: 16,
    },
    balance: {
        marginBottom: 20,
        color: colors.primary,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: '#111',
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
    },
});

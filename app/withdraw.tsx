import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { colors } from '@/src/constants/theme'; // Dizaynınıza uyğun olmalıdır

const WithdrawScreen = () => {
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState(46.75); // Məsələn balans 500 AZN-dir
    const [withdrawHistory, setWithdrawHistory] = useState([
        { id: '1', amount: 100, date: '2025-05-01' },
        { id: '2', amount: 50, date: '2025-05-05' },
    ]); // Çıxarış tarixçəsi nümunəsi

    const handleWithdraw = () => {
        if (parseFloat(amount) > balance) {
            alert('Balansınızdan çox pul çıxara bilməzsiniz.');
        } else if (parseFloat(amount) <= 0) {
            alert('Zəhmət olmasa müsbət bir məbləğ daxil edin.');
        } else {
            setBalance(balance - parseFloat(amount)); // Balansı azalt
            setWithdrawHistory([
                ...withdrawHistory,
                { id: String(withdrawHistory.length + 1), amount: parseFloat(amount), date: new Date().toLocaleDateString() },
            ]); // Yeni çıxarışı tarixçəyə əlavə et
            alert(`Uğurla ${amount} AZN çıxarış edilib!`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Çıxarış Edin</Text>
            <Text style={styles.subtitle}>Balans: {balance} AZN</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Məbləği daxil edin"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
                <Text style={styles.buttonText}>Çıxarış Et</Text>
            </TouchableOpacity>

            {/* Çıxarış tarixçəsi */}
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Çıxarış Tarixçəsi</Text>
                {withdrawHistory.length === 0 ? (
                    <Text style={styles.noHistory}>Heç bir çıxarış yoxdur.</Text>
                ) : (
                    <FlatList
                        data={withdrawHistory}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.historyItem}>
                                <Text style={styles.historyText}>
                                    {item.amount} AZN - {item.date}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>

            {/* Məlumatlı xəbərdarlıq */}
            <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                    Qeyd: Çıxarış etdikdən sonra balansınız dərhal yenilənəcəkdir. Hər hansı bir problem
                    ilə qarşılaşsanız, dəstək xidmətinə müraciət edin.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: colors.gray50, // Tətbiqdəki ümumi fon rəngi
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary, // Başlıq rəngi
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 32,
        color: colors.textSecondary, // Sub başlıq rəngi
        fontSize: 16,
    },
    inputContainer: {
        marginBottom: 32,
    },
    input: {
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    button: {
        height: 56,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    historyContainer: {
        marginTop: 32,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    historyItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: colors.gray300,
    },
    historyText: {
        fontSize: 16,
        color: colors.successDark,
    },
    noHistory: {
        fontSize: 16,
        color: colors.textSecondary,
    },
    warningContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: colors.gray200,
        borderRadius: 8,
    },
    warningText: {
        fontSize: 14,
        color: colors.danger,
    },
});

export default WithdrawScreen;

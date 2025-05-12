import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/constants/theme';
import { useLocalSearchParams } from 'expo-router';

const router = useRouter();

const OTPVerificationScreen = () => {
    const { fromSignup } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) text = text.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3 && inputs.current[index + 1]) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleContinue = () => {
        const fullOtp = otp.join('');
        if (fromSignup === 'true') {
            router.push('/referral');
        } else {
            router.push('/(tabs)');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>OTP Kodu</Text>
            <Text style={styles.subtitle}>Təsdiq kodunu daxil et</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={text => handleChange(text, index)}
                        value={digit}
                        ref={el => {
                            if (el) inputs.current[index] = el;
                        }}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 56, fontSize: 16 }}>Davam et</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 24,
        color: colors.primary,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 32,
        color: colors.textSecondary,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    otpInput: {
        width: 56,
        height: 56,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        height: 56,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
    },
});

export default OTPVerificationScreen;
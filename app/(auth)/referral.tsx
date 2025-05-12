import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import Button from '@/src/components/ui/Button';
import { colors } from '@/src/constants/theme';
import { useUser } from '@/src/context/UserContext';

export default function ReferralScreen() {
    const router = useRouter();
    const { updateReferralCode } = useUser();
    const [referral, setReferral] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleContinue = async () => {
        setLoading(true);
        setError(null);
        try {
            // Burada backend-ə göndərə bilərsən və yoxlayarsan istəsən
            await new Promise(resolve => setTimeout(resolve, 500));
            updateReferralCode(referral.trim());
            router.replace('/(tabs)'); // Əsas səhifəyə yönləndir
        } catch (err) {
            setError('Invalid referral code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text variant="h2" weight="bold" style={styles.title}>
                        Referral Code
                    </Text>
                    <Text variant="body" color="textSecondary" style={styles.subtitle}>
                        Got a referral code? Enter it below to get bonus rewards.
                    </Text>
                </View>

                <View style={styles.form}>
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text variant="body2" color="danger" style={styles.errorText}>
                                {error}
                            </Text>
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <Text variant="body2" weight="medium" style={styles.label}>
                            Referral Code
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter referral code"
                            value={referral}
                            onChangeText={setReferral}
                            autoCapitalize="characters"
                        />
                    </View>

                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        loading={loading}
                        fullWidth
                        style={styles.continueButton}
                        rightIcon={<ArrowRight size={20} color="white" />}
                    />

                    <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.skipContainer}>
                        <Text variant="body2" color="textSecondary">
                            Don't have a code?{' '}
                            <Text variant="body2" color="primary" weight="semibold">
                                Skip
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 32,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        color: colors.textSecondary,
    },
    form: {
        width: '100%',
    },
    errorContainer: {
        backgroundColor: colors.dangerLight,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    continueButton: {
        height: 56,
        marginTop: 8,
    },
    skipContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
});

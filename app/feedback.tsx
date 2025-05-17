import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function GiveFeedbackScreen() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        if (feedback.trim() === '') {
            Alert.alert('Xəta', 'Zəhmət olmasa fikrini yaz 😅');
            return;
        }

        Alert.alert('Təşəkkürlər', 'Rəyin uğurla göndərildi!');
        setFeedback('');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text variant="h3" weight="bold">Give Feedback</Text>
                    <Text variant="body" color="textSecondary" style={{ marginTop: 6 }}>
                        We’d love to hear your thoughts or suggestions 💬
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
                        Your Message
                    </Text>

                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={6}
                        placeholder="Write your feedback here..."
                        placeholderTextColor="#aaa"
                        value={feedback}
                        onChangeText={setFeedback}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text variant="body" weight="semibold" style={{ color: '#fff' }}>
                            Submit
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
    sectionTitle: {
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: '#111',
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
});

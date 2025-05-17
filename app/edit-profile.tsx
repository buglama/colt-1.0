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

export default function EditProfileScreen() {
    const [name, setName] = useState('Fərid Hümbətov');
    const [email, setEmail] = useState('thefeerid@proton.net');
    const [phone, setPhone] = useState('+994708145414');

    const handleSave = () => {
        Alert.alert('Uğurla', 'Profil məlumatları yeniləndi 👌');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text variant="h3" weight="bold">Edit Profile</Text>
                    <Text variant="body" color="textSecondary" style={{ marginTop: 6 }}>
                        Update your personal information.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text variant="body" weight="medium" style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor="#aaa"
                    />

                    <Text variant="body" weight="medium" style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />

                    <Text variant="body" weight="medium" style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text variant="body" weight="semibold" style={{ color: '#fff' }}>
                            Save Changes
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

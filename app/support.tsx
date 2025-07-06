import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { Mail, MessageCircleQuestion, Phone } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function HelpSupportScreen() {
    const handleEmailPress = () => {
        Linking.openURL('mailto:support@example.com');
    };

    const handlePhonePress = () => {
        Linking.openURL('tel:+994501234567');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text variant="h3" weight="bold">
                        Kömək və Dəstək
                    </Text>
                    <Text variant="body" color="textSecondary" style={{ marginTop: 6 }}>
                        Köməyə ehtiyacınız var? Bizimlə əlaqə saxlayın və ya aşağıdakı FAQ bölməsinə baxın.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
                        FAQ
                    </Text>

                    <View style={styles.faqItem}>
                        <Text variant="body" weight="medium">Şifrəmi necə dəyişə bilərəm?</Text>
                        <Text variant="caption" color="textSecondary">
                            Profilinizə daxil olun, "Şifrəni dəyiş" bölməsinə keçin və yeni şifrənizi daxil edin.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text variant="body" weight="medium">Sifarişlərimi necə izləyə bilərəm?</Text>
                        <Text variant="caption" color="textSecondary">
                            Sifariş Tarixçəsini açın və təfərrüatlar üçün istənilən sifariş üzərinə toxunun.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text variant="body" weight="medium">Yeni ünvanı necə əlavə edə bilərəm?</Text>
                        <Text variant="caption" color="textSecondary">
                            Profilinizdə "Ünvanlar" bölməsinə keçin və "Yeni ünvan əlavə et" düyməsini basın.
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
                        Bizimlə əlaqə saxlayın
                    </Text>

                    <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
                        <View style={styles.iconBox}>
                            <Mail size={20} color={colors.primary} />
                        </View>
                        <Text variant="body">support@example.com</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
                        <View style={styles.iconBox}>
                            <Phone size={20} color={colors.primary} />
                        </View>
                        <Text variant="body">+994 50 123 45 67</Text>
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
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3.84,
        elevation: 3,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    faqItem: {
        marginBottom: 16,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
});

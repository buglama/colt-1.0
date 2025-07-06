import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, BellRing, Lock, User, Settings } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function SettingsScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const navigateToScreen = (screen:
        "/address-management" |
        "/payment-methods" |
        "/order-history" |
        "/edit-profile" |
        "/login" |
        "/feedback" |
        "/support" |
        "/settings") => {
        router.push(screen);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text variant="h3" weight="bold" style={styles.title}>
                        Tənzimləmələr
                    </Text>
                </View>

                <View style={styles.sectionTitle}>
                    <Text variant="h4" weight="semibold">
                        Seşimlər
                    </Text>
                </View>

                <View style={styles.menuCard}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <BellRing size={20} color={colors.primary} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text variant="body" weight="medium">
                                Bildirişlər
                            </Text>
                            <Text variant="caption" color="textSecondary">
                                Bildirişləri idarə et
                            </Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            thumbColor={notificationsEnabled ? colors.primary : colors.gray300}
                            trackColor={{ false: colors.gray200, true: colors.primaryLight }}
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Lock size={20} color={colors.primary} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text variant="body" weight="medium">
                                Şifrəni dəyiş
                            </Text>
                            <Text variant="caption" color="textSecondary">
                                Şifrənizi yeniləyin
                            </Text>
                        </View>
                        <ChevronRight size={20} color={colors.textSecondary} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <User size={20} color={colors.primary} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text variant="body" weight="medium">
                                Profili idarə et
                            </Text>
                            <Text variant="caption" color="textSecondary">
                                Şəxsi məlumatlarınızı yeniləyin
                            </Text>
                        </View>
                        <ChevronRight size={20} color={colors.textSecondary} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Settings size={20} color={colors.primary} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text variant="body" weight="medium">
                                Tətbiq tənzimləmələri
                            </Text>
                            <Text variant="caption" color="textSecondary">
                                Tətbiq seçimlərinizi konfiqurasiya edin
                            </Text>
                        </View>
                        <ChevronRight size={20} color={colors.textSecondary} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <BellRing size={20} color={colors.primary} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text variant="body" weight="medium">
                                Qaranlıq rejim
                            </Text>
                            <Text variant="caption" color="textSecondary">
                                Qaranlıq rejimi aktivləşdirin
                            </Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            thumbColor={darkMode ? colors.primary : colors.gray300}
                            trackColor={{ false: colors.gray200, true: colors.primaryLight }}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => router.replace('/login')}
                    >
                        <Text variant="body" weight="medium" color="danger">
                            Çıxış et
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
    menuCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: colors.gray200,
        marginLeft: 68,
    },
    footer: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: colors.dangerLight,
        borderRadius: 12,
    },
});

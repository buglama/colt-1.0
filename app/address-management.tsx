import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, PlusCircle, ChevronRight, Pencil, Trash2 } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';

export default function AddressManagementScreen() {
    const router = useRouter();

    const addresses = [
        {
            id: 1,
            label: 'Ev',
            details: '123 Bakı küçəsi, Yasamal, Baku',
        },
        {
            id: 2,
            label: 'İş',
            details: '28 May, Nərimanov rayonu, Baku',
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text variant="h3" weight="bold">
                        Mənim ünvanlarım
                    </Text>
                </View>

                <View style={styles.menuCard}>
                    {addresses.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.menuItem}>
                                <View style={styles.menuIcon}>
                                    <MapPin size={20} color={colors.primary} />
                                </View>
                                <View style={styles.menuContent}>
                                    <Text variant="body" weight="medium">{item.label}</Text>
                                    <Text variant="caption" color="textSecondary">{item.details}</Text>
                                </View>

                                <TouchableOpacity onPress={() => console.log('Edit pressed')}>
                                    <Pencil size={18} color={colors.textSecondary} style={{ marginRight: 8 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Delete pressed')}>
                                    <Trash2 size={18} color={colors.danger} />
                                </TouchableOpacity>
                            </View>

                            {index !== addresses.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => console.log('Add new address')}
                >
                    <PlusCircle size={20} color={colors.white} />
                    <Text variant="body" weight="medium" color="white" style={styles.addText}>
                        Yeni ünvan əlavə et
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
    menuCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
    addButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        marginHorizontal: 16,
        marginTop: 24,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    addText: {
        marginLeft: 8,
    },
});

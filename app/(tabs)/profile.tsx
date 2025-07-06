import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, LogOut, CreditCard, BellRing, MapPin, ShieldCheck, User, Settings, CircleHelp as HelpCircle, Star } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';
import { useUser } from '@/src/context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Çıxış et',
      'Çıxış etmək istədiyinizdən əminsiz?',
      [
        {
          text: 'İmtina et',
          style: 'cancel',
        },
        {
          text: 'Çıxış et',
          onPress: () => {
            logout();
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

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
            Profil
          </Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text variant="h4" weight="semibold">
                {user?.fullName || 'Fərid Hümbətov'}
              </Text>
              <Text variant="body2" color="textSecondary">
                {user?.email || 'thefeerid@proton.net'}
              </Text>
              <Text variant="body2" color="textSecondary">
                {user?.phone || '+991 (70) 814-5414'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text variant="body2" weight="semibold" color="primary">
              Düzəliş et
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text variant="h4" weight="semibold">
            Hesab
          </Text>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/address-management')}
          >
            <View style={styles.menuIcon}>
              <MapPin size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Ünvanlar
              </Text>
              <Text variant="caption" color="textSecondary">
                Çatdırılma ünvanlarını idarə edin
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/payment-methods')}
          >
            <View style={styles.menuIcon}>
              <CreditCard size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Ödəniş üsulları
              </Text>
              <Text variant="caption" color="textSecondary">
                Ödəniş kartlarını və hesabları əlavə edin
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/order-history')}
          >
            <View style={styles.menuIcon}>
              <ShieldCheck size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Sifariş Tarixçəsi
              </Text>
              <Text variant="caption" color="textSecondary">
                Keçmiş sifarişlərinizə baxın
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text variant="h4" weight="semibold">
            Seçimlər
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
                Bildirişləri idarə edin
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

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/settings')}
          >
            <View style={styles.menuIcon}>
              <Settings size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Tənzimləmələr
              </Text>
              <Text variant="caption" color="textSecondary">
                Tətbiq tənzimləmələrini idarə edin
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text variant="h4" weight="semibold">
            Dəstək
          </Text>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/support')}
          >
            <View style={styles.menuIcon}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Kömək və Dəstək
              </Text>
              <Text variant="caption" color="textSecondary">
                Tez-tez verilən suallar və dəstək
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen('/feedback')}
          >
            <View style={styles.menuIcon}>
              <Star size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text variant="body" weight="medium">
                Rəy və Qiymətləndirmə
              </Text>
              <Text variant="caption" color="textSecondary">
                Tətbiq haqqında rəy bildirin
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.danger} />
          <Text variant="body" weight="medium" color="danger" style={styles.logoutText}>
            Çıxış et
          </Text>
        </TouchableOpacity>

        <Text variant="caption" color="textSecondary" style={styles.versionText}>
          Versiya 1.0.0
        </Text>
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
  profileSection: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileDetails: {
    justifyContent: 'center',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: colors.dangerLight,
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 16,
  },
});
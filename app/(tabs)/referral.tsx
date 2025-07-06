import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Share,
  RefreshControl,
  FlatList
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Copy, Share as ShareIcon, Users, TrendingUp } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import Button from '@/src/components/ui/Button';
import Card from '@/src/components/ui/Card';
import ReferralPyramid from '@/src/components/referral/ReferralPyramid';
import { colors } from '@/src/constants/theme';
import { useUser } from '@/src/context/UserContext';
import { ReferralUser } from '@/src/types';
import { mockReferralChain, mockReferredUsers } from '@/src/data/mockData';

export default function ReferralScreen() {
  const { user } = useUser();
  const [referralCode, setReferralCode] = useState('FOOD123');
  const [referredUsers, setReferredUsers] = useState<ReferralUser[]>(mockReferredUsers);
  const [referralChain, setReferralChain] = useState<ReferralUser[]>(mockReferralChain);
  const [totalEarnings, setTotalEarnings] = useState(186.25);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Set user's referral code from context
    if (user && user.referralCode) {
      setReferralCode(user.referralCode);
    }
  }, [user]);

  const handleCopyReferralCode = () => {
    // In a real implementation, we would use Clipboard.setString(referralCode)
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareReferralCode = async () => {
    try {
      await Share.share({
        message: `Colt tətbiqində mənə qoşulun və bonus cashback qazanın! İstifadə kodumdan istifadə edin: ${referralCode}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const renderReferredUser = ({ item, index }: { item: ReferralUser; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
      <Card style={styles.referredUserCard}>
        <View style={styles.referredUserContent}>
          <View style={styles.referredUserIconContainer}>
            <Users size={20} color={colors.primary} />
          </View>
          <View style={styles.referredUserInfo}>
            <Text variant="body" weight="semibold">
              {item.name}
            </Text>
            <Text variant="caption" color="textSecondary">
              Qatıldı {item.joinedDate}
            </Text>
          </View>
          <View style={styles.referredUserEarnings}>
            <TrendingUp size={16} color={colors.success} />
            <Text variant="body" weight="semibold" color="success" style={styles.earningsText}>
              ${item.earnings.toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text variant="h3" weight="bold" style={styles.title}>
            Referallar
          </Text>
          <Text variant="body" color="textSecondary">
            Dostlarını dəvət et & Birlikdə kəşbək qazanın
          </Text>
        </View>
        
        <Animated.View entering={FadeIn.delay(200).duration(500)}>
          <Card style={styles.referralCodeCard}>
            <Text variant="body" weight="medium" color="textSecondary">
              Sənin referal kodun
            </Text>
            <View style={styles.codeContainer}>
              <Text variant="h2" weight="bold" color="primary" style={styles.code}>
                {referralCode}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyReferralCode}
              >
                <Copy size={20} color={copied ? colors.success : colors.primary} />
                {copied && (
                  <Text variant="caption" color="success" style={styles.copiedText}>
                    Köçürüldü!
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <Button
              title="Dəvət Kodunuzu Paylaşın"
              variant="primary"
              leftIcon={<ShareIcon size={18} color="white" />}
              fullWidth
              onPress={handleShareReferralCode}
            />
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(300).duration(500)}>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="h3" weight="bold" color="primary">
                  {referredUsers.length}
                </Text>
                <Text variant="body2" color="textSecondary">
                  Dəvət edilmiş dostlar
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text variant="h3" weight="bold" color="primary">
                  ${totalEarnings.toFixed(2)}
                </Text>
                <Text variant="body2" color="textSecondary">
                  Cəmi qazanc
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Referal sistemi
            </Text>
            <ReferralPyramid referralChain={referralChain} />
          </View>
        </Animated.View>
        
        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Sənin referalların 
          </Text>
          
          {referredUsers.length > 0 ? (
            <FlatList
              data={referredUsers}
              renderItem={renderReferredUser}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Card style={styles.emptyCard}>
              <Text variant="body" color="textSecondary" style={styles.emptyText}>
                Siz hələ heç bir dostunuzu dəvət etməmisiniz. Qazanmağa başlamaq üçün referal kodunuzu paylaşın!
              </Text>
              <Button
                title="Share Now"
                variant="primary"
                style={styles.shareButton}
                onPress={handleShareReferralCode}
              />
            </Card>
          )}
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
  referralCodeCard: {
    margin: 16,
    padding: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  code: {
    letterSpacing: 2,
  },
  copyButton: {
    padding: 8,
  },
  copiedText: {
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray200,
    marginHorizontal: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  referredUserCard: {
    marginBottom: 12,
  },
  referredUserContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  referredUserIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  referredUserInfo: {
    flex: 1,
  },
  referredUserEarnings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningsText: {
    marginLeft: 4,
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  shareButton: {
    minWidth: 120,
  },
});
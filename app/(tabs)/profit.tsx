import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowUpRight, Wallet, ArrowDownToLine } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import Button from '@/src/components/ui/Button';
import Card from '@/src/components/ui/Card';
import CashbackHistoryItem from '@/src/components/cashback/CashbackHistoryItem';
import { colors } from '@/src/constants/theme';
import { mockCashbackTransactions } from '@/src/data/mockData';
import { CashbackTransaction } from '@/src/types';
import { formatCurrency } from '@/src/utils/formatUtils';

export default function ProfitScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<CashbackTransaction[]>(mockCashbackTransactions);
  const [activeFilter, setActiveFilter] = useState<'all' | 'earnings' | 'withdrawals'>('all');
  
  const totalBalance = transactions.reduce((total, transaction) => {
    if (transaction.type === 'withdrawal') {
      return total - transaction.amount;
    } else {
      return total + transaction.amount;
    }
  }, 0);
  
  const totalEarned = transactions
    .filter(t => t.type !== 'withdrawal')
    .reduce((total, transaction) => total + transaction.amount, 0);
  
  const totalWithdrawn = transactions
    .filter(t => t.type === 'withdrawal')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'earnings') return transaction.type !== 'withdrawal';
    if (activeFilter === 'withdrawals') return transaction.type === 'withdrawal';
    return true;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleWithdraw = () => {
    router.push('/withdraw');
  };

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
            Your Profit
          </Text>
          <Text variant="body" color="textSecondary">
            Track your cashback earnings & withdrawals
          </Text>
        </View>
        
        <Animated.View entering={FadeIn.delay(200).duration(500)}>
          <Card style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text variant="body" weight="medium" color="textSecondary">
                Available Balance
              </Text>
              <Wallet size={24} color={colors.primary} />
            </View>
            <Text variant="h2" weight="bold" color="primary" style={styles.balanceAmount}>
              ${formatCurrency(totalBalance)}
            </Text>
            <Button
              title="Withdraw"
              variant="primary"
              leftIcon={<ArrowDownToLine size={18} color="white" />}
              onPress={handleWithdraw}
              style={styles.withdrawButton}
            />
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(300).duration(500)}>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.statHeader}>
                  <Text variant="body2" weight="medium" color="textSecondary">
                    Total Earned
                  </Text>
                  <View style={[styles.statIconContainer, styles.earnedIconContainer]}>
                    <ArrowUpRight size={16} color={colors.success} />
                  </View>
                </View>
                <Text variant="h4" weight="bold" color="success">
                  ${formatCurrency(totalEarned)}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <View style={styles.statHeader}>
                  <Text variant="body2" weight="medium" color="textSecondary">
                    Total Withdrawn
                  </Text>
                  <View style={[styles.statIconContainer, styles.withdrawnIconContainer]}>
                    <ArrowDownToLine size={16} color={colors.danger} />
                  </View>
                </View>
                <Text variant="h4" weight="bold" color="danger">
                  ${formatCurrency(totalWithdrawn)}
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <View style={styles.historySection}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Transaction History
          </Text>
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'all' && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                variant="body2"
                weight={activeFilter === 'all' ? 'semibold' : 'regular'}
                color={activeFilter === 'all' ? 'primary' : 'textSecondary'}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'earnings' && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter('earnings')}
            >
              <Text
                variant="body2"
                weight={activeFilter === 'earnings' ? 'semibold' : 'regular'}
                color={activeFilter === 'earnings' ? 'primary' : 'textSecondary'}
              >
                Earnings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'withdrawals' && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter('withdrawals')}
            >
              <Text
                variant="body2"
                weight={activeFilter === 'withdrawals' ? 'semibold' : 'regular'}
                color={activeFilter === 'withdrawals' ? 'primary' : 'textSecondary'}
              >
                Withdrawals
              </Text>
            </TouchableOpacity>
          </View>
          
          <Card style={styles.historyCard}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <CashbackHistoryItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text variant="body" color="textSecondary" style={styles.emptyText}>
                  No transactions found.
                </Text>
              </View>
            )}
          </Card>
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
  balanceCard: {
    margin: 16,
    padding: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceAmount: {
    marginBottom: 16,
  },
  withdrawButton: {
    marginTop: 8,
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
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedIconContainer: {
    backgroundColor: colors.successLight,
  },
  withdrawnIconContainer: {
    backgroundColor: colors.dangerLight,
  },
  statDivider: {
    width: 1,
    height: 64,
    backgroundColor: colors.gray200,
    marginHorizontal: 16,
  },
  historySection: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeFilter: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  historyCard: {
    overflow: 'hidden',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});
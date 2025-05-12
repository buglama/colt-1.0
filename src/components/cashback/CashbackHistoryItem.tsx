import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@/src/components/ui/Text';
import { colors } from '@/src/constants/theme';
import { CashbackTransaction } from '@/src/types';
import { formatDate } from '@/src/utils/dateUtils';
import { ShoppingBag, TrendingUp, ArrowDownToLine } from 'lucide-react-native';

interface CashbackHistoryItemProps {
  transaction: CashbackTransaction;
}

export default function CashbackHistoryItem({ transaction }: CashbackHistoryItemProps) {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'order':
        return <ShoppingBag size={24} color={colors.primary} />;
      case 'referral':
        return <TrendingUp size={24} color={colors.secondary} />;
      case 'withdrawal':
        return <ArrowDownToLine size={24} color={colors.textSecondary} />;
      default:
        return <ShoppingBag size={24} color={colors.primary} />;
    }
  };

  const getAmountColor = () => {
    if (transaction.type === 'withdrawal') {
      return colors.danger;
    }
    return colors.success;
  };

  const getTransactionTitle = () => {
    switch (transaction.type) {
      case 'order':
        return `Order #${transaction.orderId}`;
      case 'referral':
        return `Referral: ${transaction.referredUser}`;
      case 'withdrawal':
        return 'Withdrawal';
      default:
        return 'Transaction';
    }
  };

  const getTransactionDescription = () => {
    switch (transaction.type) {
      case 'order':
        return `${transaction.cashbackPercent}% cashback`;
      case 'referral':
        return `Level ${transaction.referralLevel} referral bonus`;
      case 'withdrawal':
        return transaction.method || 'Bank transfer';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getTransactionIcon()}
      </View>
      <View style={styles.content}>
        <Text variant="body" weight="semibold">
          {getTransactionTitle()}
        </Text>
        <Text variant="caption" color="textSecondary">
          {getTransactionDescription()}
        </Text>
        <Text variant="caption" color="textSecondary">
          {formatDate(transaction.date)}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text 
          variant="body" 
          weight="semibold" 
          style={[styles.amount, { color: getAmountColor() }]}
        >
          {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
  },
});
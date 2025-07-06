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
      case 'Sifariş':
        return <ShoppingBag size={24} color={colors.primary} />;
      case 'Referal':
        return <TrendingUp size={24} color={colors.secondary} />;
      case 'Çıxarış':
        return <ArrowDownToLine size={24} color={colors.textSecondary} />;
      default:
        return <ShoppingBag size={24} color={colors.primary} />;
    }
  };

  const getAmountColor = () => {
    if (transaction.type === 'Çıxarış') {
      return colors.danger;
    }
    return colors.success;
  };

  const getTransactionTitle = () => {
    switch (transaction.type) {
      case 'Sifariş':
        return `Sifariş #${transaction.orderId}`;
      case 'Referal':
        return `Referal: ${transaction.referredUser}`;
      case 'Çıxarış':
        return 'Çıxarış';
      default:
        return 'Əməliyyat';
    }
  };

  const getTransactionDescription = () => {
    switch (transaction.type) {
      case 'Sifariş':
        return `${transaction.cashbackPercent}% kəşbek`;
      case 'Referal':
        return `Level ${transaction.referralLevel} referal bonusu`;
      case 'Çıxarış':
        return transaction.method || 'Bank əməliyyatı';
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
          {transaction.type === 'Çıxarış' ? '-' : '+'}${transaction.amount.toFixed(2)}
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
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper'; 
import { colors } from '../theme/colors'; 
import { CURRENCIES_DATA } from '../constants/currency';
import { categoriesData, incomeCategoriesData } from '../constants/categories';

const allCategories = [...categoriesData, ...incomeCategoriesData];

export default function OperationsScreen() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const bills = useSelector((state) => state.bills.list || []);

  const reversedTransactions = [...transactions].reverse();

   const convertToUAH = (amount, currencyCode) => {
    const currency = CURRENCIES_DATA.find((item) => item.code === currencyCode);
    const numericAmount = Number(amount) || 0;

    if (!currency || currency.code === "UAH") {
      return numericAmount;
    }
    return numericAmount * currency.rateToUAH;
  };

  const totalBalance = bills.reduce((sum, bill) => {
    const convertedAmount = convertToUAH(bill.balance, bill.currencyCode);
    return sum + convertedAmount;
  }, 0);

  const renderTransactionItem = ({ item }) => {
    const category = allCategories.find(category => category.name === item.title);

    if (!category) {
      return null;
    }

    const isIncome = item.type === 'income';
    const amountText = `${isIncome ? '+' : '-'}${parseFloat(item.amount).toFixed(2)} ₴`;
    const amountColor = isIncome ? '#28a745' : '#dc3545';

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <Icon name={category.icon} size={24} color="#FFF" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionBill}>{item.bill}</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {amountText}
        </Text>
      </View>
    );
  };
  
  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Загальний баланс</Text>
        <Text style={styles.headerAmount}>{totalBalance.toFixed(2)} ₴</Text>
      </View>
      <FlatList
        data={reversedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.black },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 6,
  },
  headerAmount: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E', 
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1, 
    justifyContent: 'center',
    marginTop: 20,
  },
  transactionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  transactionBill: {
    color: '#8A8A8E', 
    fontSize: 14,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
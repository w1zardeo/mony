import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme/colors';
import { categoriesData, incomeCategoriesData } from '../constants/categories';
import { useTotalBalance } from '../hooks/useTotalBalance';

const allCategories = [...categoriesData, ...incomeCategoriesData];

export default function OperationsScreen() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const bills = useSelector((state) => state.bills.list || []);

  const reversedTransactions = [...transactions].reverse();


  const totalBalance = useTotalBalance();

  const sections = useMemo(() => {
    const grouped = reversedTransactions.reduce((acc, transaction) => {
      if (!transaction.date) {
        return acc; 
      }

      const date = new Date(transaction.date);

      if (isNaN(date.getTime())) {
        return acc; 
      }
      const dateString = date.toISOString().split('T')[0];

      if (!acc[dateString]) {
        acc[dateString] = {
          dateObj: date,
          data: [],
          total: 0,
        };
      }

      acc[dateString].data.push(transaction);

      const amount = parseFloat(transaction.amount || 0);
      if (transaction.type === 'income') {
        acc[dateString].total += amount;
      } else {
        acc[dateString].total -= amount;
      }

      return acc;
    }, {});

    return Object.keys(grouped).map((dateString) => ({
      dateObj: grouped[dateString].dateObj,
      total: grouped[dateString].total,
      data: grouped[dateString].data,
    }));
  }, [reversedTransactions]);

  const renderTransactionItem = ({ item }) => {
    const category = allCategories.find(
      (category) => category.name === item.title,
    );

    if (!category) {
      return null;
    }

    const isIncome = item.type === 'income';
    const amountText = `${isIncome ? '+' : '-'}${parseFloat(item.amount).toFixed(
      2,
    )} ₴`;
    const amountColor = isIncome ? '#28a745' : '#dc3545';

    return (
      <View style={styles.transactionItem}>
        <View
          style={[styles.iconContainer, { backgroundColor: category.color }]}>
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

  const renderSectionHeader = ({ section }) => {
    const { dateObj, total } = section;

    const day = dateObj.getDate();
    const weekdays = [
      'неділя',
      'понеділок',
      'вівторок',
      'середа',
      'четвер',
      "п'ятниця",
      'субота',
    ];
    const months = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ];

    const weekday = weekdays[dateObj.getDay()];
    const monthYear = `${
      months[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;

    const totalColor = total > 0 ? '#28a745' : total < 0 ? '#dc3545' : '#8A8A8E';
    const totalText = `${total > 0 ? '+' : ''}${total.toFixed(2)} ₴`;

    return (
      <View style={styles.sectionHeader}>
        <View style={styles.sectionDateContainer}>
          <Text style={styles.sectionDayText}>{day}</Text>
          <View style={styles.sectionDateDetails}>
            <Text style={styles.sectionWeekdayText}>{weekday}</Text>
            <Text style={styles.sectionMonthYearText}>{monthYear}</Text>
          </View>
        </View>
        <Text style={[styles.sectionTotalText, { color: totalColor }]}>
          {totalText}
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

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={renderTransactionItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={false}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.black,
    marginTop: 10,
  },
  sectionDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDayText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '400',
    marginRight: 8,
  },
  sectionDateDetails: {
    justifyContent: 'center',
  },
  sectionWeekdayText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  sectionMonthYearText: {
    color: '#8A8A8E',
    fontSize: 13,
  },
  sectionTotalText: {
    fontSize: 15,
    fontWeight: '600',
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
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";
import { CURRENCIES_DATA } from "../constants/currency";
import { categoriesData, incomeCategoriesData } from "../constants/categories";

const CategoryCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
      <Icon name={item.icon} size={24} color="#FFF" />
    </View>
    <View>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAmount}>{item.amount}</Text>
    </View>
  </TouchableOpacity>
);

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("expenses");
  
  const transactions = useSelector((state) => state.transactions.transactions);
  const bills = useSelector((state) => state.bills.list || []);

  const convertToUAH = (amount, currencyCode) => {
    const currency = CURRENCIES_DATA.find((item) => item.code === currencyCode);
    if (!currency || currency.code === "UAH") {
      return Number(String(amount).replace(",", ".")) || 0;
    }
    return (Number(String(amount).replace(",", ".")) || 0) * currency.rateToUAH;
  };

  const totalBalance = bills.reduce((sum, bill) => {
    const convertedAmount = convertToUAH(bill.balance, bill.currencyCode);
    return sum + convertedAmount;
  }, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense') 
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income') 
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);
  
  const getTotalByCategory = (categoryName) => {
    return transactions
      .filter((transaction) => transaction.title === categoryName)
      .reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount || 0),
        0
      );
  };
  
  const openAddTransactionModal = (category) => {
    navigation.navigate("AddTransaction", { category });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Загальний баланс</Text>
          <Text style={styles.headerAmount}>{totalBalance.toFixed(2)} ₴</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text style={styles.tabText}>Витрати</Text>
            <Text style={styles.tabAmount}>{totalExpenses.toFixed(2)} ₴</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "income" && styles.activeTab]}
            onPress={() => setActiveTab("income")}
          >
            <Text style={styles.tabText}>Доходи</Text>
            <Text style={styles.tabAmount}>{totalIncome.toFixed(2)} ₴</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {activeTab === "expenses" ? (
            <>
              {categoriesData.map((item) => {
                const total = getTotalByCategory(item.name);
                return (
                  <CategoryCard
                    key={item.id}
                    item={{ ...item, amount: `${total.toFixed(2)} ₴` }}
                    onPress={() => openAddTransactionModal(item)}
                  />
                );
              })}
              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                onPress={() => openAddTransactionModal(categoriesData[0])}
              >
                <Icon
                  name="add-outline"
                  size={24}
                  color="#FFF"
                  style={styles.addIcon}
                />
                <Text style={styles.cardTitle}>Додати</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {incomeCategoriesData.map((item) => {
                 const total = getTotalByCategory(item.name);
                return (
                <CategoryCard
                  key={item.id}
                  item={{ ...item, amount: `${total.toFixed(2)} ₴` }}
                  onPress={() => openAddTransactionModal(item)}
                />
                )
              })}
              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                onPress={() => openAddTransactionModal(incomeCategoriesData[0])}
              >
                <Icon
                  name="add-outline"
                  size={24}
                  color="#FFF"
                  style={styles.addIcon}
                />
                <Text style={styles.cardTitle}>Додати</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.black },
  container: { paddingHorizontal: 16, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 20 },
  headerTitle: { color: colors.white, fontSize: 16, marginBottom: 6 },
  headerAmount: { color: colors.white, fontSize: 34, fontWeight: "600" },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    marginBottom: 10,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 8 },
  activeTab: { backgroundColor: "#3A3A3C" },
  tabText: { color: "#A3A3A3", fontSize: 16 },
  tabAmount: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  cardAmount: { color: "#A3A3A3", fontSize: 14, marginTop: 4 },
  addCard: { borderWidth: 1.5, borderColor: "#3A3A3C", borderStyle: "dashed" },
  addIcon: { marginRight: 12 },
});
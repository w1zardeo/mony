import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // 1. Імпортуємо useNavigation
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";

// ... (масиви categoriesData та incomeCategoriesData залишаються без змін)
const categoriesData = [
  {
    id: "1",
    name: "Їжа",
    amount: "100 ₴",
    icon: "fast-food-outline",
    color: "#7E57C2",
  },
  {
    id: "2",
    name: "Кафе",
    amount: "0 ₴",
    icon: "cafe-outline",
    color: "#A1887F",
  },
  {
    id: "3",
    name: "Розваги",
    amount: "0 ₴",
    icon: "film-outline",
    color: "#66BB6A",
  },
  {
    id: "4",
    name: "Транспорт",
    amount: "0 ₴",
    icon: "bus-outline",
    color: "#42A5F5",
  },
  {
    id: "5",
    name: "Здоров'я",
    amount: "0 ₴",
    icon: "medkit-outline",
    color: "#26A69A",
  },
  {
    id: "6",
    name: "Домашні тва..",
    amount: "0 ₴",
    icon: "paw-outline",
    color: "#8D6E63",
  },
  {
    id: "7",
    name: "Сім'я",
    amount: "0 ₴",
    icon: "people-outline",
    color: "#EF5350",
  },
  {
    id: "8",
    name: "Одяг",
    amount: "0 ₴",
    icon: "shirt-outline",
    color: "#FF7043",
  },
];
const incomeCategoriesData = [
  {
    id: "salary1",
    name: "Зарплата",
    amount: "0 ₴",
    icon: "cash-outline",
    color: "#4CAF50",
  },
];

// 2. Робимо картку кнопкою
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
  const transactions = useSelector((state) => state.transactions.transactions);
  const [activeTab, setActiveTab] = useState("expenses");
  const navigation = useNavigation(); // 3. Ініціалізуємо навігацію

  // 4. Функція для відкриття модального вікна
  const openAddTransactionModal = (category) => {
    navigation.navigate("AddTransaction", { category });
  };

  const getTotalByCategory = (categoryName) => {
    return transactions
      .filter((transaction) => transaction.title === categoryName)
      .reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount || 0),
        0
      );
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Загальний баланс</Text>
          <Text style={styles.headerAmount}>4000 ₴</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text style={styles.tabText}>Витрати</Text>
            <Text style={styles.tabAmount}>100 ₴</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "income" && styles.activeTab]}
            onPress={() => setActiveTab("income")}
          >
            <Text style={styles.tabText}>Доходи</Text>
            <Text style={styles.tabAmount}>0 ₴</Text>
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
                    item={{ ...item, amount: `${total} ₴` }}
                    onPress={() => openAddTransactionModal(item)}
                  />
                );
              })}

              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                // Кнопка "Додати" може відкривати модалку для першої категорії як приклад
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
              {incomeCategoriesData.map((item) => (
                <CategoryCard
                  key={item.id}
                  item={item}
                  onPress={() => openAddTransactionModal(item)}
                />
              ))}
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

// ... (стилі залишаються ті ж самі)
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

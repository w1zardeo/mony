import React, { useState, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";
import { CURRENCIES_DATA } from "../constants/currency";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CategoryCard = ({ item, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <Icon name={item.icon || "help-outline"} size={24} color="#FFF" />
      )}
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
  const [currentDate, setCurrentDate] = useState(new Date());


  const [viewMode, setViewMode] = useState("monthly");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const transactions = useSelector((state) => state.transactions.transactions);
  const bills = useSelector((state) => state.bills.list || []);

  const expenseCategories = useSelector((state) => state.categories.expense);
  const incomeCategories = useSelector((state) => state.categories.income);

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

  
  const filteredTransactions = useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
     
      if (viewMode === "monthly") {
        return (
          transactionDate.getFullYear() === currentDate.getFullYear() &&
          transactionDate.getMonth() === currentDate.getMonth()
        );
      }
      else {
        return (
          transactionDate.getFullYear() === currentDate.getFullYear() &&
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getDate() === currentDate.getDate()
        );
      }
    });
  }, [transactions, currentDate, viewMode]); 

  const totalExpenses = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);

  const totalIncome = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);

  const getTotalByCategory = (categoryName) => {
    return filteredTransactions
      .filter((transaction) => transaction.title === categoryName)
      .reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount || 0),
        0
      );
  };

  const openAddTransactionModal = (category) => {
    navigation.navigate("AddTransaction", {
      category,
      selectedDate: currentDate.toISOString(),
    });
  };

  const openAddCategoryModal = (defaultType) => {
    navigation.navigate("AddCategoryModal", { defaultType });
  };
  const openEditCategoryModal = (category) => {
    navigation.navigate("AddCategoryModal", { category: category });
  };

  const monthNames = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setCurrentDate(new Date(date));
    setViewMode("daily"); 
    hideDatePicker();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    const minDate = new Date(1970, 0, 1);
    if (newDate < minDate) {
      setCurrentDate(minDate);
    } else {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handlePrev = () => {
    if (viewMode === "monthly") {
      handlePrevMonth();
    } else {
      handlePrevDay();
    }
  };

  const handleNext = () => {
    if (viewMode === "monthly") {
      handleNextMonth();
    } else {
      handleNextDay();
    }
  };

  const formatDate = () => {
    if (viewMode === "monthly") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
      return `${currentDate.getDate()} ${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    }
  };
  
  const isPrevDisabled =
    viewMode === "monthly" &&
    currentDate.getFullYear() === 1970 &&
    currentDate.getMonth() === 0;

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Загальний баланс</Text>
          <Text style={styles.headerAmount}>{totalBalance.toFixed(2)} ₴</Text>
        </View>

        
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === "daily" && styles.activeViewModeButton,
            ]}
            onPress={() => setViewMode("daily")}
          >
            <Text style={styles.viewModeText}>День</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === "monthly" && styles.activeViewModeButton,
            ]}
            onPress={() => setViewMode("monthly")}
          >
            <Text style={styles.viewModeText}>Місяць</Text>
          </TouchableOpacity>
        </View>
      


        <View style={styles.dateNavigator}>
          <TouchableOpacity
            onPress={handlePrev} 
            disabled={isPrevDisabled}
            style={styles.arrowButton}
          >
            <Icon
              name="chevron-back"
              size={28}
              color={isPrevDisabled ? "#4D4D4D" : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateText}>{formatDate()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
            <Icon name="chevron-forward" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text style={styles.tabText}>
              {viewMode === "monthly" ? "Витрати за місяць" : "Витрати за день"}
            </Text>
            <Text style={styles.tabAmount}>{totalExpenses.toFixed(2)} ₴</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "income" && styles.activeTab]}
            onPress={() => setActiveTab("income")}
          >
            <Text style={styles.tabText}>
              {viewMode === "monthly" ? "Доходи за місяць" : "Доходи за день"}
            </Text>
            <Text style={styles.tabAmount}>{totalIncome.toFixed(2)} ₴</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {activeTab === "expenses" ? (
            <>
              {expenseCategories.map((item) => {
                const total = getTotalByCategory(item.name);
                return (
                  <CategoryCard
                    key={item.id}
                    item={{ ...item, amount: `${total.toFixed(2)} ₴` }}
                    onPress={() => openAddTransactionModal(item)}
                    onLongPress={() => openEditCategoryModal(item)}
                  />
                );
              })}

              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                onPress={() => openAddCategoryModal("expense")}
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
              {incomeCategories.map((item) => {
                const total = getTotalByCategory(item.name);
                return (
                  <CategoryCard
                    key={item.id}
                    item={{ ...item, amount: `${total.toFixed(2)} ₴` }}
                    onPress={() => openAddTransactionModal(item)}
                    onLongPress={() => openEditCategoryModal(item)}
                  />
                );
              })}

              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                onPress={() => openAddCategoryModal("income")}
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

    
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={currentDate}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        confirmTextIOS="Обрати"
        cancelTextIOS="Скасувати"
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.black,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 6,
  },
  headerAmount: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "600",
  },
  viewModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  activeViewModeButton: {
    backgroundColor: "#3A3A3C",
  },
  viewModeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  dateNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  arrowButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#3A3A3C",
  },
  tabText: {
    color: "#A3A3A3",
    fontSize: 16,
    marginBottom: 4,
  },
  tabAmount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
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
    overflow: "hidden",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  cardAmount: {
    color: colors.white,
    fontSize: 14,
    marginTop: 4,
  },
  addCard: {
    borderWidth: 1.5,
    borderColor: "#3A3A3C",
    borderStyle: "dashed",
  },
  addIcon: {
    marginRight: 12,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});

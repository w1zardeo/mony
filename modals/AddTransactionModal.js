import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../components/ModalWrapper";
import { colors } from "../theme/colors";
import { addTransaction } from "../store/transactionsSlice";
import { updateBillBalance, setSelectedBill } from "../store/billsSlice";
import { CURRENCIES_DATA } from "../constants/currency";

const CalcButton = ({ value, onPress }) => (
  <TouchableOpacity style={styles.calcButton} onPress={() => onPress(value)}>
    <Text style={styles.calcButtonText}>{value}</Text>
  </TouchableOpacity>
);

export default function AddTransactionModal({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { category, selectedDate } = route.params;
  const transactionType = category?.type || "expense";

  const selectedBill = useSelector((s) => s.bills.selectedBill);
  const billsList = useSelector((s) => s.bills.list || []);
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    if (!selectedBill && billsList.length > 0) {
      dispatch(setSelectedBill(billsList[0]));
    }
  }, [selectedBill, billsList, dispatch]);

  const handlePress = (value) => {
    if (amount === "0" && value !== ",") setAmount(value);
    else if (value === "," && amount.includes(",")) return;
    else if (amount.length < 12) setAmount(amount + value);
  };

  const handleBackspace = () =>
    setAmount((a) => (a.length > 1 ? a.slice(0, -1) : "0"));

  const onSave = () => {
    if (!selectedBill) {
      alert("Будь ласка, оберіть рахунок");
      return;
    }
    const finalAmountInUAH = parseFloat(amount.replace(",", "."));
    if (isNaN(finalAmountInUAH) || finalAmountInUAH === 0) return;

    const transaction = {
      id: Date.now().toString(),
      title: category?.name || "Інше",
      amount: finalAmountInUAH,
      billId: selectedBill.id,
      billTitle: selectedBill.title,
      date: selectedDate,
      type: transactionType,
    };

    dispatch(addTransaction(transaction));

    let amountToUpdate = finalAmountInUAH;

    if (selectedBill.currencyCode && selectedBill.currencyCode !== "UAH") {
      const currency = CURRENCIES_DATA.find(
        (category) => category.code === selectedBill.currencyCode
      );
      if (currency && currency.rateToUAH > 0) {
        amountToUpdate = finalAmountInUAH / currency.rateToUAH;
      }
    }
    const finalAmountForBill =
      transactionType === "income" ? amountToUpdate : -amountToUpdate;

    dispatch(
      updateBillBalance({
        billId: selectedBill.id,
        amount: finalAmountForBill,
      })
    );

    navigation.goBack();
  };

  const AccountSelector = () => (
    <View
      style={[
        styles.selectorBox,
        { backgroundColor: selectedBill?.color || "#1E1E1E" },
      ]}
    >
      <Text style={styles.selectorTitle}>
        {transactionType === "income" ? "До рахунку" : "З рахунку"}
      </Text>
      <TouchableOpacity
        style={styles.selectorValueWrapper}
        onPress={() =>
          navigation.navigate("SelectBillModal", { isSelecting: true })
        }
      >
        <Icon
          name={selectedBill?.icon || "card-outline"}
          size={20}
          color={colors.white}
        />
        <Text style={styles.selectorValue}>
          {selectedBill?.title || "Картка"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const CategoryDisplay = () => (
    <View
      style={[
        styles.selectorBox,
        { backgroundColor: category?.color || "#1E1E1E" },
      ]}
    >
      <Text style={styles.selectorTitle}>
        {transactionType === "income" ? "З категорії" : "До категорії"}
      </Text>
      <View style={styles.selectorValueWrapper}>
        <Icon
          name={category?.icon || "logo-usd"}
          size={20}
          color={colors.white}
        />
        <Text style={styles.selectorValue}>{category?.name || "Інше"}</Text>
      </View>
    </View>
  );

  return (
    <ModalWrapper bg={colors.black}>
      <View style={styles.content}>
        <View style={styles.selectorContainer}>
          {transactionType === "income" ? (
            <>
              <CategoryDisplay />
              <AccountSelector />
            </>
          ) : (
            <>
              <AccountSelector />
              <CategoryDisplay />
            </>
          )}
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{amount} ₴</Text>
        </View>
        <View style={styles.keypad}>
          <View style={styles.calcButton} />
          <CalcButton value="7" onPress={handlePress} />
          <CalcButton value="8" onPress={handlePress} />
          <CalcButton value="9" onPress={handlePress} />
          <TouchableOpacity style={styles.calcButton} onPress={handleBackspace}>
            <Icon name="backspace-outline" size={28} color="#3478F6" />
          </TouchableOpacity>

          <View style={styles.calcButton} />
          <CalcButton value="4" onPress={handlePress} />
          <CalcButton value="5" onPress={handlePress} />
          <CalcButton value="6" onPress={handlePress} />
          <View style={styles.calcButton} />

          <View style={styles.calcButton} />
          <CalcButton value="1" onPress={handlePress} />
          <CalcButton value="2" onPress={handlePress} />
          <CalcButton value="3" onPress={handlePress} />
          <TouchableOpacity
            style={[styles.calcButton, styles.confirmButton]}
            onPress={onSave}
          >
            <Icon name="checkmark-outline" size={32} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.calcButton} />
          <View style={styles.calcButton} />
          <CalcButton value="0" onPress={handlePress} />
          <CalcButton value="," onPress={handlePress} />
        </View>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "space-between" },
  selectorContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
  },
  selectorBox: { flex: 1, padding: 16, alignItems: "center" },
  selectorTitle: { color: "#A3A3A3", fontSize: 14, marginBottom: 8 },
  selectorValueWrapper: { flexDirection: "row", alignItems: "center" },
  selectorValue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  amountContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  amountText: { color: colors.white, fontSize: 56, fontWeight: "bold" },
  keypad: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  calcButton: {
    width: "20%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  calcButtonText: { color: colors.white, fontSize: 28 },
  confirmButton: {
    height: 140,
    position: "absolute",
    right: 0,
    bottom: 70,
    backgroundColor: "#3478F6",
    borderRadius: 12,
  },
});

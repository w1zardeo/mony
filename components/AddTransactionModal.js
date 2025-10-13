// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { colors } from "../theme/colors";
// import ModalWrapper from "../components/ModalWrapper";
// import { useDispatch } from "react-redux";
// import { addTransaction } from "../store/transactionsSlice";
// import { nanoid } from "@reduxjs/toolkit";

// // Кнопка для клавіатури (без змін)
// const CalcButton = ({ value, onPress }) => (
//   <TouchableOpacity style={styles.calcButton} onPress={() => onPress(value)}>
//     <Text style={styles.calcButtonText}>{value}</Text>
//   </TouchableOpacity>
// );

// export default function AddTransactionScreen() {
//   // Змінив назву для відповідності
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { category } = route.params;

//   const [amount, setAmount] = useState("0");

//   // Логіка для вводу цифр (без змін)
//   const handlePress = (value) => {
//     if (amount === "0" && value !== ",") {
//       setAmount(value);
//     } else if (value === "," && amount.includes(",")) {
//       return;
//     } else if (amount.length < 10) {
//       setAmount(amount + value);
//     }
//   };
//   const handleBackspace = () => {
//     setAmount(amount.slice(0, -1) || "0");
//   };
// //   const handleConfirm = () => {
// //     console.log(`Saved: ${amount} for category ${category.name}`);
// //     navigation.goBack();
// //   };

//   const onSave = () => {
//     const transaction = {
//       id: Date.now().toString(),
//       title: category.name,
//       amount: amount,
//     };

//     dispatch(addTransaction(transaction))
//     navigation.goBack();
//   };

//   return (
//     <ModalWrapper bg={colors.black}>
//       <View style={styles.content}>
//         {/* Верхній блок вибору */}
//         <View style={styles.selectorContainer}>
//           <View style={styles.selectorBox}>
//             <Text style={styles.selectorTitle}>З рахунку</Text>
//             <View style={styles.selectorValueWrapper}>
//               <Icon name="card-outline" size={20} color={colors.white} />
//               <Text style={styles.selectorValue}>Картка</Text>
//             </View>
//           </View>
//           <View
//             style={[styles.selectorBox, { backgroundColor: category.color }]}
//           >
//             <Text style={styles.selectorTitle}>До категорії</Text>
//             <View style={styles.selectorValueWrapper}>
//               <Icon name={category.icon} size={20} color={colors.white} />
//               <Text style={styles.selectorValue}>{category.name}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Дисплей суми */}
//         <View style={styles.amountContainer}>
//           <Text style={styles.amountText}>{amount} ₴</Text>
//         </View>

//         {/* ОНОВЛЕНА КЛАВІАТУРА */}
//         <View style={styles.keypad}>
//           {/* Рядок 1 */}
//           <View style={styles.calcButton} />
//           <CalcButton value="7" onPress={handlePress} />
//           <CalcButton value="8" onPress={handlePress} />
//           <CalcButton value="9" onPress={handlePress} />
//           <TouchableOpacity style={styles.calcButton} onPress={handleBackspace}>
//             <Icon name="backspace-outline" size={28} color="#3478F6" />
//           </TouchableOpacity>

//           {/* Рядок 2 */}
//           <View style={styles.calcButton} />
//           <CalcButton value="4" onPress={handlePress} />
//           <CalcButton value="5" onPress={handlePress} />
//           <CalcButton value="6" onPress={handlePress} />
//           <View style={styles.calcButton} />

//           {/* Рядок 3 */}
//           <View style={styles.calcButton} />
//           <CalcButton value="1" onPress={handlePress} />
//           <CalcButton value="2" onPress={handlePress} />
//           <CalcButton value="3" onPress={handlePress} />
//           <TouchableOpacity
//             style={[styles.calcButton, styles.confirmButton]}
//             onPress={onSave}
//           >
//             <Icon name="checkmark-outline" size={32} color={colors.white} />
//           </TouchableOpacity>

//           {/* Рядок 4 */}
//           <View style={styles.calcButton} />
//           <View style={styles.calcButton} />
//           <CalcButton value="0" onPress={handlePress} />
//           <CalcButton value="," onPress={handlePress} />
//         </View>
//       </View>
//     </ModalWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   content: { flex: 1, justifyContent: "space-between" },
//   selectorContainer: {
//     flexDirection: "row",
//     marginHorizontal: 16,
//     borderRadius: 16,
//     overflow: "hidden",
//     backgroundColor: "#1E1E1E",
//   },
//   selectorBox: { flex: 1, padding: 16, alignItems: "center" },
//   selectorTitle: { color: "#A3A3A3", fontSize: 14, marginBottom: 8 },
//   selectorValueWrapper: { flexDirection: "row", alignItems: "center" },
//   selectorValue: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   amountContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   amountText: { color: colors.white, fontSize: 56, fontWeight: "bold" },
//   keypad: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
//   calcButton: {
//     width: "20%",
//     height: 70,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   calcButtonText: { color: colors.white, fontSize: 28 },
//   confirmButton: {
//     height: 140,
//     position: "absolute",
//     right: 0,
//     bottom: 70,
//     backgroundColor: "#3478F6",
//     borderRadius: 12,
//   },
// });

// src/screens/AddTransactionScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../components/ModalWrapper";
import { colors } from "../theme/colors";
import { addTransaction } from "../store/transactionsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { updateBillBalance } from "../store/billsSlice";

const CalcButton = ({ value, onPress }) => (
  <TouchableOpacity style={styles.calcButton} onPress={() => onPress(value)}>
    <Text style={styles.calcButtonText}>{value}</Text>
  </TouchableOpacity>
);

export default function AddTransactionModal({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // беремо вибраний рахунок з redux
  const selectedBill = useSelector((s) => s.bills.selectedBill);
  // можна мати fallback
  const [amount, setAmount] = useState("0");

  const handlePress = (value) => {
    if (amount === "0" && value !== ",") {
      setAmount(value);
    } else if (value === "," && amount.includes(",")) {
      return;
    } else if (amount.length < 12) {
      setAmount(amount + value);
    }
  };
  const handleBackspace = () => setAmount((a) => (a.length > 1 ? a.slice(0, -1) : "0"));

//   const onSave = () => {
//     const transaction = {
//       id: nanoid(),
//       title: route.params?.category?.name || "Інше",
//       amount: amount,
//       billId: selectedBill?.id || null,
//       billTitle: selectedBill?.title || "Картка",
//       createdAt: new Date().toISOString(),
//     };

//     dispatch(addTransaction(transaction));
//     navigation.goBack();
//   };


const onSave = () => {
    // Перевірка, чи обрано рахунок
    if (!selectedBill) {
      alert("Будь ласка, оберіть рахунок");
      return;
    }

    const finalAmount = parseFloat(amount.replace(",", "."));
    if (finalAmount === 0) return; 

    const transaction = {
      id: nanoid(),
      title: route.params?.category?.name || "Інше",
      amount: finalAmount,
      billId: selectedBill.id,
      billTitle: selectedBill.title,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTransaction(transaction));

    dispatch(
      updateBillBalance({
        billId: selectedBill.id,
        amount: finalAmount,
      })
    );

    navigation.goBack();
  };

  return (
    <ModalWrapper bg={colors.black}>
      <View style={styles.content}>
        <View style={styles.selectorContainer}>
          <View style={styles.selectorBox}>
            <Text style={styles.selectorTitle}>З рахунку</Text>

            <TouchableOpacity
              style={styles.selectorValueWrapper}
              onPress={() => navigation.navigate("SelectBillModal")}
            >
              <Icon name="card-outline" size={20} color={colors.white} />
              <Text style={styles.selectorValue}>
                {selectedBill?.title || "Картка"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.selectorBox, { backgroundColor: route.params?.category?.color || "#1E1E1E" }]}
          >
            <Text style={styles.selectorTitle}>До категорії</Text>
            <View style={styles.selectorValueWrapper}>
              <Icon name={route.params?.category?.icon || "logo-usd"} size={20} color={colors.white} />
              <Text style={styles.selectorValue}>
                {route.params?.category?.name || "Інше"}
              </Text>
            </View>
          </View>
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

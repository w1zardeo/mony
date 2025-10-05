// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import ScreenWrapper from "../components/ScreenWrapper";
// import { colors } from "../theme/colors";
// import { Dropdown } from "react-native-element-dropdown";
// import { billsType } from "../constants/data";
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function AddBillsModal() {
//   const [bill, setBill] = useState({ type: "usual", balance: "" });

//   const route = useRoute();
//   const navigation = useNavigation();

//   const currency = route.params?.selectedCurrency?.name || "Українська гривня";

//   return (
//     <ScreenWrapper style={styles.wrapper}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Text style={styles.backText}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Новий рахунок</Text>
//         </View>

//         <ScrollView contentContainerStyle={styles.content}>
//           <View style={styles.inputBlock}>
//             <Text style={styles.label}>Назва</Text>
//             <View style={styles.inputBox}>
//               <TextInput
//                 placeholder="Введіть назву"
//                 placeholderTextColor={"#aaa"}
//                 style={styles.input}
//               />
//             </View>
//           </View>

//           <View style={styles.iconBlock}>
//             <Text style={styles.iconLabel}>Іконка</Text>
//             <View style={styles.iconRightBox}>
//               <Text style={styles.iconSymbol}>＋</Text>
//             </View>
//           </View>

//           <View style={styles.inputBlock}>
//             <Text style={styles.label}>Опис</Text>
//             <View style={styles.inputBox}>
//               <TextInput
//                 placeholder=""
//                 placeholderTextColor={"#aaa"}
//                 style={[styles.input, { height: 40 }]}
//               />
//             </View>
//           </View>

//           <View style={styles.inputBlock}>
//             <Text style={styles.label}>Тип рахунку</Text>
//             <View style={styles.rowBox}>
//               <Dropdown
//                 style={styles.dropdownContainer}
//                 activeColor={colors.neutral}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.dropdownSelectedText}
//                 data={Object.values(billsType)}
//                 maxHeight={300}
//                 labelField="label"
//                 valueField="value"
//                 itemTextStyle={styles.dropdownItemText}
//                 itemContainerStyle={styles.dropdownItemContainer}
//                 containerStyle={styles.dropdownListContainer}
//                 placeholder={"Заощадження"}
//                 value={bill.type}
//                 onChange={(item) => {
//                   setBill({ ...bill, type: item.value });
//                 }}
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("CurrencyModal", {
//                 selectedCurrency: { name: currency },
//               })
//             }
//           >
//             <View style={styles.inputBlock}>
//               <Text style={styles.label}>Валюта рахунку</Text>
//               <View style={styles.textStyle}>
//                 <Text style={styles.valueText}>{currency}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>

//           <View style={styles.inputBlock}>
//           <Text style={styles.label}>Поточний баланс</Text>
//           <View style={styles.balanceBox}>
//             <TextInput
//               value={bill.balance}
//               onChangeText={(text) => setBill({ ...bill, balance: text })}
//               placeholder="0"
//               placeholderTextColor="#aaa"
//               style={styles.balanceInput}
//             />
//             <Text style={styles.currencyText}>₴</Text>
//           </View>
//         </View>
//           <View style={{ height: 60 }} />
//         </ScrollView>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//    wrapper: { flex: 1, backgroundColor: colors.black },
//   textStyle: { paddingLeft: 10 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   backButton: {
//     width: 36,
//     height: 36,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 8,
//   },
//   backText: { color: colors.white, fontSize: 22 },
//   title: {
//     flex: 1,
//     textAlign: "center",
//     marginRight: 35,
//     color: colors.white,
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   content: { paddingHorizontal: 16, paddingBottom: 40 },
//   inputBlock: {
//     marginTop: 12,
//     backgroundColor: "transparent",
//     borderRadius: 12,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#444",
//   },
//   label: {
//     color: colors.white,
//     marginBottom: 12,
//     fontSize: 16,
//     fontWeight: "600",
//     paddingLeft: 10,
//   },
//   inputBox: {
//     backgroundColor: "transparent",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#888",
//     padding: 15,
//   },
//   input: { color: colors.white, fontSize: 16 },
//   rowBox: {
//     height: 56,
//     borderRadius: 8,
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   valueText: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: "600",
//     paddingRight: 10,
//   },
//   iconBlock: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#3A3A3C",
//     borderRadius: 12,
//     overflow: "hidden",
//     height: 56,
//     backgroundColor: colors.black,
//     justifyContent: "space-between",
//     paddingLeft: 14,
//   },
//   iconLabel: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     paddingLeft: 15,
//   },
//   iconRightBox: {
//     width: 56,
//     height: "100%",
//     backgroundColor: "#0b3d2b",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconSymbol: { fontSize: 18, color: colors.green, fontWeight: "600" },
//   dropdownContainer: {
//     height: 54,
//     borderWidth: 1,
//     borderColor: "#d4d4d4",
//     paddingHorizontal: 15,
//     borderRadius: 15,
//   },
//   dropdownSelectedText: { color: colors.white, fontSize: 16 },
//   dropdownItemText: { color: colors.white },
//   dropdownItemContainer: { borderRadius: 15, marginHorizontal: 7 },
//   dropdownListContainer: {
//     backgroundColor: colors.black,
//     borderRadius: 15,
//     paddingVertical: 7,
//     top: 5,
//     borderColor: colors.neutral500,
//   },
//   placeholderStyle: { color: colors.white, fontSize: 16 },

//   // баланс
//   balanceBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#888",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 54,
//   },
//   balanceInput: {
//     flex: 1,
//     color: colors.white,
//     fontSize: 16,
//   },
//   currencyText: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 6,
//   },
// });

// FILE: screens/AddBillsModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { Dropdown } from "react-native-element-dropdown";
import { billsType } from "../constants/data";
import { useNavigation } from "@react-navigation/native";
import { CurrencyContext } from "../context/currencyContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../store/billsSlice";

export default function AddBillsModal() {
  const dispatch = useDispatch();
  const { currency } = useContext(CurrencyContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bill, setBill] = useState({ type: "usual", balance: "" });

  const navigation = useNavigation();

  const onSave = () => {
    const payload = {
      id: Date.now().toString(),
      title: title.trim() || "Новий рахунок",
      balance: Number(bill.balance) || 0,
      currency: currency.name,
      currencyCode: currency.code, 
      type: bill.type || "usual",
    };

    dispatch(addBill(payload));
    navigation.goBack();
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Новий рахунок</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Назва</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Введіть назву"
              placeholderTextColor={"#aaa"}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.iconBlock}>
          <Text style={styles.iconLabel}>Іконка</Text>
          <View style={styles.iconRightBox}>
            <Text style={styles.iconSymbol}>＋</Text>
          </View>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Опис</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder=""
              placeholderTextColor={"#aaa"}
              style={[styles.input, { height: 40 }]}
            />
          </View>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Тип рахунку</Text>
          <View style={styles.rowBox}>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.dropdownSelectedText}
              data={Object.values(billsType)}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Заощадження"}
              value={bill.type}
              onChange={(item) => {
                setBill({ ...bill, type: item.value });
              }}
            />
          </View>
        </View>

        <TouchableOpacity
        onPress={() => navigation.navigate("CurrencyModal")}
      >
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Валюта рахунку</Text>
            <View style={styles.textStyle}>
              <Text style={styles.valueText}>{currency.name}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Поточний баланс</Text>
          <View style={styles.balanceBox}>
            <TextInput
              value={bill.balance}
              onChangeText={(text) => setBill({ ...bill, balance: text })}
              placeholder="0"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              style={styles.balanceInput}
            />
            <Text style={styles.currencyText}>{currency.code}</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />

        <TouchableOpacity style={styles.saveButton} onPress={onSave} activeOpacity={0.8}>
          <Text style={styles.saveText}>Зберегти</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.black },
  textStyle: { paddingLeft: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  backText: { color: colors.white, fontSize: 22 },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 35,
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  inputBlock: {
    marginTop: 12,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  label: {
    color: colors.white,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 10,
  },
  inputBox: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    padding: 15,
  },
  input: { color: colors.white, fontSize: 16 },
  rowBox: {
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  valueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    paddingRight: 10,
  },
  iconBlock: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 12,
    overflow: "hidden",
    height: 56,
    backgroundColor: colors.black,
    justifyContent: "space-between",
    paddingLeft: 14,
  },
  iconLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 15,
  },
  iconRightBox: {
    width: 56,
    height: "100%",
    backgroundColor: "#0b3d2b",
    justifyContent: "center",
    alignItems: "center",
  },
  iconSymbol: { fontSize: 18, color: colors.green, fontWeight: "600" },
  dropdownContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  dropdownSelectedText: { color: colors.white, fontSize: 16 },
  dropdownItemText: { color: colors.white },
  dropdownItemContainer: { borderRadius: 15, marginHorizontal: 7 },
  dropdownListContainer: {
    backgroundColor: colors.black,
    borderRadius: 15,
    paddingVertical: 7,
    top: 5,
    borderColor: colors.neutral500,
  },
  placeholderStyle: { color: colors.white, fontSize: 16 },
  // баланс
  balanceBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 54,
  },
  balanceInput: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  currencyText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  saveButton: {
    marginTop: 12,
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: colors.white, fontWeight: "600", fontSize: 16 },
});

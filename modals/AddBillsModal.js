import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { Dropdown } from "react-native-element-dropdown";
import { billsType } from "../constants/data";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CurrencyContext } from "../context/currencyContext";
import { useDispatch } from "react-redux";
import { addBill, updateBill, deleteBill } from "../store/billsSlice";
import { Ionicons } from "@expo/vector-icons";
import {getRandomIcon, getRandomColor} from '../features/functions';

export default function AddBillsModal() {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const existingBill = route.params?.bill;
  const isEditMode = !!existingBill;

  const { currency, setCurrency } = useContext(CurrencyContext);

  const [title, setTitle] = useState(existingBill?.title || "");
  const [bill, setBill] = useState({
    type: existingBill?.type || route.params?.defaultType || "usual",
    balance: existingBill?.balance?.toString() || "",
  });
  
  const [icon, setIcon] = useState(existingBill?.icon || getRandomIcon());
  const [color, setColor] = useState(existingBill?.color || getRandomColor()); 

  useEffect(() => {
    if (isEditMode && existingBill.currencyCode && existingBill.currency) {
      setCurrency({ code: existingBill.currencyCode, name: existingBill.currency });
    }
  }, []);

  useEffect(() => {
    if (route.params?.selectedIcon) {
      setIcon(route.params.selectedIcon);
      navigation.setParams({ selectedIcon: null });
    }
    if (route.params?.selectedColor) {
      setColor(route.params.selectedColor);
      navigation.setParams({ selectedColor: null });
    }
  }, [route.params?.selectedIcon, route.params?.selectedColor, navigation]); 


  const onSave = () => {
    const balanceValue = bill.balance.replace(',', '.').trim() || "0";
    const payload = {
      id: isEditMode ? existingBill.id : Date.now().toString(),
      title: title.trim() || "Новий рахунок",
      balance: balanceValue,
      currency: currency.name,
      currencyCode: currency.code,
      type: bill.type || "usual",
      icon: icon,
      color: color, 
    };

    if (isEditMode) {
      dispatch(updateBill(payload));
    } else {
      dispatch(addBill(payload));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Видалити рахунок",
      `Ви впевнені, що хочете видалити "${existingBill.title}"? Ця дія є незворотною.`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          onPress: () => {
            dispatch(deleteBill({ id: existingBill.id }));
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{isEditMode ? 'Редагувати рахунок' : 'Новий рахунок'}</Text>
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
          <TouchableOpacity 
            style={[styles.iconRightBox, { backgroundColor: color }]} 
            onPress={() => navigation.navigate("IconPickerModal", { sourceScreen: route.name })}
          >
            {icon ? (
              <Ionicons name={icon} size={28} color={colors.white} /> 
            ) : (
              <Ionicons name="image-outline" size={24} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.iconBlock}>
          <Text style={styles.iconLabel}>Колір</Text>
          <TouchableOpacity 
            style={styles.colorRightBox}
            onPress={() => navigation.navigate("ColorPickerModal", { sourceScreen: route.name })}
          >
            <View style={[styles.colorPreview, { backgroundColor: color }]} />
          </TouchableOpacity>
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
              onChange={(item) => setBill({ ...bill, type: item.value })}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("CurrencyModal")}>
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
          <Text style={styles.saveText}>{isEditMode ? 'Зберегти' : 'Створити'}</Text>
        </TouchableOpacity>

        {isEditMode && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
            <Text style={styles.deleteText}>Видалити рахунок</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.black },
  textStyle: { paddingLeft: 10 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12 },
  backButton: { width: 36, height: 36, alignItems: "center", justifyContent: "center", marginRight: 8 },
  backText: { color: colors.white, fontSize: 22 },
  title: { flex: 1, textAlign: "center", marginRight: 35, color: colors.white, fontSize: 20, fontWeight: "600" },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  inputBlock: { marginTop: 12, backgroundColor: "transparent", borderRadius: 12, padding: 20, borderWidth: 1, borderColor: "#444" },
  label: { color: colors.white, marginBottom: 12, fontSize: 16, fontWeight: "600", paddingLeft: 10 },
  inputBox: { backgroundColor: "transparent", borderRadius: 8, borderWidth: 1, borderColor: "#888", padding: 15 },
  input: { color: colors.white, fontSize: 16 },
  rowBox: { height: 56, borderRadius: 8, justifyContent: "center", paddingHorizontal: 10 },
  valueText: { color: colors.white, fontSize: 16, fontWeight: "600", paddingRight: 10 },
  iconBlock: { marginTop: 12, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#3A3A3C", borderRadius: 12, overflow: "hidden", height: 56, backgroundColor: colors.black, justifyContent: "space-between", paddingLeft: 14 },
  iconLabel: { color: "#fff", fontSize: 16, fontWeight: "600", paddingLeft: 15 },
  iconRightBox: { 
    width: 56, 
    height: "100%", 
    justifyContent: "center", 
    alignItems: "center",
  },
  colorRightBox: {
    width: 56, 
    height: "100%", 
    justifyContent: "center", 
    alignItems: "center",
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: 16, 
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  dropdownContainer: { height: 54, borderWidth: 1, borderColor: "#d4d4d4", paddingHorizontal: 15, borderRadius: 15 },
  dropdownSelectedText: { color: colors.white, fontSize: 16 },
  dropdownItemText: { color: colors.white },
  dropdownItemContainer: { borderRadius: 15, marginHorizontal: 7 },
  dropdownListContainer: { backgroundColor: colors.black, borderRadius: 15, paddingVertical: 7, top: 5, borderColor: colors.neutral500 },
  placeholderStyle: { color: colors.white, fontSize: 16 },
  balanceBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#888", borderRadius: 8, paddingHorizontal: 15, height: 54 },
  balanceInput: { flex: 1, color: colors.white, fontSize: 16 },
  currencyText: { color: colors.white, fontSize: 16, fontWeight: "600", marginLeft: 6 },
  saveButton: { marginTop: 12, backgroundColor: colors.green, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  saveText: { color: colors.white, fontWeight: "600", fontSize: 16 },
  deleteButton: { marginTop: 12, backgroundColor: '#D93F3F', paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  deleteText: { color: colors.white, fontWeight: "600", fontSize: 16 },
});
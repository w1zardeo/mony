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
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function AddBillsModal() {
   const route = useRoute();
  const dispatch = useDispatch();
  const { currency } = useContext(CurrencyContext);
  const [title, setTitle] = useState("");
  const [bill, setBill] = useState({
    type: route.params?.defaultType || "usual", 
    balance: "",
  });
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const onSave = () => {
  const payload = {
    id: Date.now().toString(),
    title: title.trim() || "Новий рахунок",
    balance: bill.balance.trim() || "0", 
    currency: currency.name,
    currencyCode: currency.code,
    type: bill.type || "usual",
    image: image || null,
  };

  dispatch(addBill(payload));
  navigation.goBack();
};

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      alert("Потрібен дозвіл на доступ до галереї!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
          <Text style={styles.iconLabel}>Картинка</Text>
          <TouchableOpacity style={styles.iconRightBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.iconImage} />
            ) : (
              <Ionicons name="image-outline" size={24} color={colors.white}/>
            )}
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
              onChange={(item) => {
                setBill({ ...bill, type: item.value });
              }}
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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={onSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveText}>Створити</Text>
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
    backgroundColor: colors.green,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: colors.white, fontWeight: "600", fontSize: 16 },
  iconImage: {
  width: "100%",
  height: "100%",
  borderRadius: 12,
},
});

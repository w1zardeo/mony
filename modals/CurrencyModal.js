import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ModalWrapper from "../components/ModalWrapper";
import { colors } from "../theme/colors";
import { CURRENCIES_DATA } from "../constants/currency";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CurrencyContext } from "../context/currencyContext";
import { useContext } from "react";

export default function CurrencyModal() {
  const navigation = useNavigation();
  const { currency, setCurrency } = useContext(CurrencyContext);

  const [selected, setSelected] = useState(currency.name);

  const handleSelect = (item) => {
    setSelected(item.name);
    setCurrency({ name: item.name, code: item.code }); // оновлюємо контекст
    navigation.goBack(); // повертаємось назад
  };

  return (
    <ModalWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Виберіть валюту</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.white} />
          <TextInput
            placeholder="Назва або код"
            placeholderTextColor={colors.white}
            style={styles.textInput}
          />
        </View>

        <ScrollView contentContainerStyle={styles.listContainer}>
          <Text style={styles.sectionTitle}>Основні валюти</Text>
          {CURRENCIES_DATA.map((item) => (
            <TouchableOpacity
              key={item.code}
              style={styles.row}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.radioOuter}>
                {selected === item.name && <View style={styles.radioInner} />}
              </View>

              <Text style={styles.currencyName}>{item.name}</Text>
              <Text style={styles.currencyCode}>{item.code}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 5,
  },
  textInput: {
    color: colors.white,
    paddingVertical: 8,
    fontSize: 16,
    marginLeft: 16,
  },
  listContainer: {
    paddingBottom: 40,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  currencyName: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  currencyCode: {
    color: colors.white,
    fontSize: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.blue,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
  },
});
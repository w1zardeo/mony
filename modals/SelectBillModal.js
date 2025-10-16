import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { CURRENCIES_DATA } from "../constants/currency";
import { billsType } from "../constants/data";
import { useDispatch } from "react-redux";
import { setSelectedBill } from "../store/billsSlice";

function TabButton({ title, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

export default function SelectBillModal() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("bills");
  const navigation = useNavigation();

  const billsFromRedux = useSelector((state) => state.bills.list || []);
  const listToRender = billsFromRedux;

  const convertToUAH = (amount, currencyCode) => {
    const currency = CURRENCIES_DATA.find((item) => item.code === currencyCode);
    if (!currency) return Number(amount) || 0;
    return (Number(amount) || 0) * currency.rateToUAH;
  };

  const groupedBills = billsFromRedux.reduce((acc, bill) => {
    acc[bill.type] = acc[bill.type] || [];
    acc[bill.type].push(bill);
    return acc;
  }, {});

  billsType.forEach((type) => {
    groupedBills[type.value] = groupedBills[type.value] || [];
  });

  const handleSelectBill = (bill) => {
    dispatch(setSelectedBill(bill));
    navigation.goBack();
  };



  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header - як у BillsScreen, але без total */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Рахунки</Text>

          <TouchableOpacity
            style={styles.plusCircle}
            onPress={() => navigation.navigate("AddBillsModal")}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRow}>
          <TabButton
            title="Рахунки"
            active={tab === "bills"}
            onPress={() => setTab("bills")}
          />
          <TabButton
            title="Борги"
            active={tab === "debts"}
            onPress={() => setTab("debts")}
          />
          <TabButton
            title="Всього"
            active={tab === "total"}
            onPress={() => setTab("total")}
          />
        </View>

        {tab === "bills" && (
          <View style={styles.section}>
            {billsType.map((type) => (
              <View key={type.value} style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{type.label}</Text>
                  <Text style={styles.sectionAmount}>
                    {groupedBills[type.value]
                      .reduce(
                        (sum, item) =>
                          sum + convertToUAH(item.balance, item.currencyCode),
                        0
                      )
                      .toFixed(2)}{" "}
                    ₴
                  </Text>
                </View>

                <FlatList
                  data={groupedBills[type.value]}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.billsCard}
                      onPress={() => handleSelectBill(item)}
                    >
                      <View style={{ alignItems: "center", marginRight: 12 }}>
                        <View style={styles.billsIcon}>
                          {item.image ? (
                            <Image
                              source={{ uri: item.image }}
                              style={styles.billsImage}
                            />
                          ) : (
                            <Text style={styles.billsIconText}>+</Text>
                          )}
                        </View>
                        {item.description && (
                          <Text style={styles.description}>{item.description}</Text>
                        )}
                      </View>

                      <View style={styles.billsInfo}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.billsAmount}>
                          {item.balance + " " + (item.currencyCode || "₴")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={styles.addBlock}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("AddBillsModal", {
                      selectedCurrency: { name: "Українська гривня" },
                      defaultType: type.value,
                    })
                  }
                >
                  <View style={styles.addIconBox}>
                    <Text style={styles.billsIconText}>+</Text>
                  </View>
                  <View style={styles.billsInfo}>
                    <Text style={styles.title}>Додати {type.label.toLowerCase()}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {tab === "debts" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Тут поки що нічого немає — Борги</Text>
          </View>
        )}

        {tab === "total" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Тут поки що нічого немає — Всього</Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, backgroundColor: colors.black },
  container: { paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 12 },
  headerTitle: { color: colors.white, fontSize: 20, fontWeight: "600" },
  plusCircle: {
    position: "absolute",
    right: 18,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: { color: colors.lightGray, fontSize: 24 },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 10,
  },
  tabButton: { alignItems: "center", paddingVertical: 8, flex: 1 },
  tabText: { color: colors.lightGray, fontSize: 16 },
  tabTextActive: { color: colors.blue, fontWeight: "600" },
  tabIndicator: {
    marginTop: 6,
    height: 3,
    width: 40,
    backgroundColor: colors.blue,
    borderRadius: 2,
  },
  section: { marginTop: 6 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { color: colors.white, fontSize: 18 },
  sectionAmount: { color: colors.green, fontSize: 16, fontWeight: "600" },
  billsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightBlack,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  billsIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#0F2A3B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  billsIconText: { color: colors.white, fontSize: 22 },
  billsInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: colors.white, fontSize: 16 },
  billsAmount: { color: colors.green, fontSize: 16, fontWeight: "600" },
  addBlock: {
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#313537",
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: colors.lightBlack,
  },
  addIconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#262A2C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addIcon: { color: colors.white, fontSize: 26 },
  addText: { color: colors.white, fontSize: 16 },
  emptyState: { marginTop: 30, alignItems: "center" },
  emptyText: { color: colors.white },
  billsImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  description: { color: colors.lightGray, fontSize: 12, marginTop: 6 },
});

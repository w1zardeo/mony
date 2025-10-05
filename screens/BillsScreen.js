// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import ScreenWrapper from "../components/ScreenWrapper";
// import { colors } from "../theme/colors";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";

// /**
//  * Статичні рахунки — завжди показуються
//  * Використовуємо унікальні id з префіксом "static-" щоб не конфліктували з id з Redux
//  */
// const staticBills = [
//   { id: "static-1", title: "Картка", amount: 600 },
//   { id: "static-2", title: "Готівка", amount: 900 },
// ];

// function TabButton({ title, active, onPress }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={styles.tabButton}
//       activeOpacity={0.7}
//     >
//       <Text style={[styles.tabText, active && styles.tabTextActive]}>
//         {title}
//       </Text>
//       {active && <View style={styles.tabIndicator} />}
//     </TouchableOpacity>
//   );
// }

// export default function BillsScreen() {
//   const [tab, setTab] = useState("bills");
//   const navigation = useNavigation();

//  const billsFromRedux = useSelector((state) => state.bills.list || []);

// const listToRender = [...staticBills, ...billsFromRedux];

//   // total по всіх відображених рахунках (статичні + додані)
//   const total = listToRender.reduce(
//     (sum, item) => sum + (Number(item.balance ?? item.amount) || 0),
//     0
//   );

//   return (
//     <ScreenWrapper style={styles.wrapper}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Загальний баланс</Text>
//           <Text style={styles.headerAmount}>{total} ₴</Text>

//           <TouchableOpacity
//             style={styles.plusCircle}
//             onPress={() =>
//               navigation.navigate("AddBillsModal", {
//                 selectedCurrency: { name: "Українська гривня" },
//               })
//             }
//           >
//             <Text style={styles.plusText}>+</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.tabsRow}>
//           <TabButton
//             title="Рахунки"
//             active={tab === "bills"}
//             onPress={() => setTab("bills")}
//           />
//           <TabButton
//             title="Борги"
//             active={tab === "debts"}
//             onPress={() => setTab("debts")}
//           />
//           <TabButton
//             title="Всього"
//             active={tab === "total"}
//             onPress={() => setTab("total")}
//           />
//         </View>

//         {tab === "bills" && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Рахунки</Text>
//               <Text style={styles.sectionAmount}>{total} ₴</Text>
//             </View>

//             <FlatList
//               data={listToRender}
//               keyExtractor={(item) => (item.id ? item.id.toString() : item.title)}
//               scrollEnabled={false}
//               renderItem={({ item }) => (
//                 <View style={styles.billsCard}>
//                   <View style={styles.billsIcon}>
//                     <Text style={styles.billsIconText}>+</Text>
//                   </View>
//                   <View style={styles.billsInfo}>
//                     <Text style={styles.title}>{item.title}</Text>
//                     <Text style={styles.billsAmount}>
//                      {(item.balance ?? item.amount) + " " + (item.currencyCode || "₴")}
//                     </Text>
//                   </View>
//                 </View>
//               )}
//             />

//             {/* ОКРЕМА картка "Додати фінансовий рахунок" — завжди присутня */}
//             <TouchableOpacity
//               style={styles.addBlock}
//               activeOpacity={0.8}
//               onPress={() =>
//                 navigation.navigate("AddBillsModal")
//               }
//             >
//               <View style={styles.addIconBox}>
//                 <Text style={styles.billsIconText}>+</Text>
//               </View>
//               <View style={styles.billsInfo}>
//                 <Text style={styles.title}>Додати фінансовий рахунок</Text>
//               </View>
//             </TouchableOpacity>

//             <View style={[styles.section, { paddingTop: 18 }]}>
//               <View style={styles.sectionHeader}>
//                 <Text style={styles.sectionTitle}>Заощадження</Text>
//                 <Text style={styles.sectionAmount}>0 ₴</Text>
//               </View>

//               <View style={styles.savingCard}>
//                 <View style={styles.savingIcon}>
//                   <Text style={styles.addIcon}>+</Text>
//                 </View>
//                 <View style={styles.savingInfo}>
//                   <Text style={styles.title}>На мрію</Text>
//                   <Text style={styles.sectionAmount}>0 ₴</Text>
//                 </View>
//               </View>

//               <TouchableOpacity
//                 style={styles.addBlock}
//                 activeOpacity={0.7}
//                 onPress={() =>
//                   navigation.navigate("AddBillsModal", {
//                     selectedCurrency: { name: "Українська гривня" },
//                   })
//                 }
//               >
//                 <View style={styles.addIconBox}>
//                   <Text style={styles.addIcon}>+</Text>
//                 </View>
//                 <Text style={styles.addText}>Додати ощадний рахунок</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}

//         {tab === "debts" && (
//           <View style={styles.emptyState}>
//             <Text style={styles.emptyText}>
//               Тут поки що нічого немає — Борги
//             </Text>
//           </View>
//         )}

//         {tab === "total" && (
//           <View style={styles.emptyState}>
//             <Text style={styles.emptyText}>
//               Тут поки що нічого немає — Всього
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { paddingHorizontal: 16, backgroundColor: colors.black },
//   container: { paddingBottom: 40 },
//   header: { alignItems: "center", marginBottom: 12 },
//   headerTitle: { color: colors.white, fontSize: 16, marginBottom: 6 },
//   headerAmount: { color: colors.white, fontSize: 34, fontWeight: "600" },
//   plusCircle: {
//     position: "absolute",
//     right: 18,
//     top: 12,
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: colors.gray,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   plusText: { color: colors.lightGray, fontSize: 24 },
//   tabsRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 12,
//     marginBottom: 10,
//   },
//   tabButton: { alignItems: "center", paddingVertical: 8, flex: 1 },
//   tabText: { color: colors.lightGray, fontSize: 16 },
//   tabTextActive: { color: colors.blue, fontWeight: "600" },
//   tabIndicator: {
//     marginTop: 6,
//     height: 3,
//     width: 40,
//     backgroundColor: colors.blue,
//     borderRadius: 2,
//   },
//   section: { marginTop: 6 },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   sectionTitle: { color: colors.white, fontSize: 18 },
//   sectionAmount: { color: colors.green, fontSize: 16, fontWeight: "600" },
//   billsCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.lightBlack,
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginBottom: 12,
//   },
//   billsIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 10,
//     backgroundColor: "#0F2A3B",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   billsIconText: { color: colors.white, fontSize: 22 },
//   billsInfo: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: { color: colors.white, fontSize: 16 },
//   billsAmount: { color: colors.green, fontSize: 16, fontWeight: "600" },
//   addBlock: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderStyle: "dashed",
//     borderWidth: 1,
//     borderColor: "#313537",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 18,
//     backgroundColor: colors.lightBlack,
//   },
//   addIconBox: {
//     width: 48,
//     height: 48,
//     borderRadius: 10,
//     backgroundColor: "#262A2C",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   addIcon: { color: colors.white, fontSize: 26 },
//   addText: { color: colors.white, fontSize: 16 },
//   savingCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.lightBlack,
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginBottom: 12,
//   },
//   savingIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 10,
//     backgroundColor: "#0F2A3B",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   savingIconText: { color: colors.white },
//   savingInfo: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   emptyState: { marginTop: 30, alignItems: "center" },
//   emptyText: { color: colors.white },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

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

export default function BillsScreen() {
  const [tab, setTab] = useState("bills");
  const navigation = useNavigation();

  const billsFromRedux = useSelector((state) => state.bills.list || []);
  const listToRender = billsFromRedux; 

  const total = listToRender.reduce(
    (sum, item) => sum + (Number(item.balance ?? 0) || 0),
    0
  );

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Загальний баланс</Text>
          <Text style={styles.headerAmount}>{total} ₴</Text>

          <TouchableOpacity
            style={styles.plusCircle}
            onPress={() =>
              navigation.navigate("AddBillsModal")
            }
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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Рахунки</Text>
              <Text style={styles.sectionAmount}>{total} ₴</Text>
            </View>

            <FlatList
              data={listToRender}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.billsCard}>
                  <View style={styles.billsIcon}>
                    <Text style={styles.billsIconText}>+</Text>
                  </View>
                  <View style={styles.billsInfo}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.billsAmount}>
                      {(item.balance) +
                        " " +
                        (item.currencyCode || "₴")}
                    </Text>
                  </View>
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.addBlock}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("AddBillsModal", {
                  selectedCurrency: { name: "Українська гривня" },
                })
              }
            >
              <View style={styles.addIconBox}>
                <Text style={styles.billsIconText}>+</Text>
              </View>
              <View style={styles.billsInfo}>
                <Text style={styles.title}>Додати фінансовий рахунок</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.section, { paddingTop: 18 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Заощадження</Text>
                <Text style={styles.sectionAmount}>0 ₴</Text>
              </View>

              {/* <View style={styles.savingCard}>
                <View style={styles.savingIcon}>
                  <Text style={styles.addIcon}>+</Text>
                </View>
                <View style={styles.savingInfo}>
                  <Text style={styles.title}>На мрію</Text>
                  <Text style={styles.sectionAmount}>0 ₴</Text>
                </View>
              </View> */}

              <TouchableOpacity
                style={styles.addBlock}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("AddBillsModal", {
                    selectedCurrency: { name: "Українська гривня" },
                  })
                }
              >
                <View style={styles.addIconBox}>
                  <Text style={styles.addIcon}>+</Text>
                </View>
                <Text style={styles.addText}>Додати ощадний рахунок</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {tab === "debts" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Тут поки що нічого немає — Борги
            </Text>
          </View>
        )}

        {tab === "total" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Тут поки що нічого немає — Всього
            </Text>
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
  headerTitle: { color: colors.white, fontSize: 16, marginBottom: 6 },
  headerAmount: { color: colors.white, fontSize: 34, fontWeight: "600" },
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
  savingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightBlack,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  savingIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#0F2A3B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  savingIconText: { color: colors.white },
  savingInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyState: { marginTop: 30, alignItems: "center" },
  emptyText: { color: colors.white },
});

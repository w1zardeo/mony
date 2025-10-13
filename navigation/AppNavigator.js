import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BillsScreen from "../screens/BillsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import OperationScreen from "../screens/OperationScreen";
import BottomTabsNavigator from "./BottomTabs";
import CurrencyModal from "../modals/CurrencyModal";
import AddBillsModal from "../modals/AddBillsModal";
import { CurrencyProvider } from "../context/currencyContext";
import AddTransactionModal from "../components/AddTransactionModal";
import SelectBillModal from "../modals/SelectBillModal";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <CurrencyProvider>
      <Stack.Navigator>
        {/* <Stack.Screen
        name="Bills"
        component={BillsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Operation"
        component={OperationScreen}
        options={{ headerShown: false }}
      /> */}
        <Stack.Screen
          name="Tabs"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CurrencyModal"
          component={CurrencyModal}
          options={{
            headerShown: false,
            presentation: "modal", // відкриває як модалку
            animation: "slide_from_bottom", // анімація знизу
          }}
        />
        <Stack.Screen
          name="AddBillsModal"
          component={AddBillsModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionModal}
          options={{
            headerShown: false,
            presentation: "modal", // відкриває як модалку
            animation: "slide_from_bottom", // анімація знизу
          }}
        />
        <Stack.Screen
          name="SelectBillModal"
          component={SelectBillModal}
          options={{
            headerShown: false,
            presentation: "modal", // відкриває як модалку
            animation: "slide_from_bottom", // анімація знизу
          }}
        />
      </Stack.Navigator>
    </CurrencyProvider>
  );
}

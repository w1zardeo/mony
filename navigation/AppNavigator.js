import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BillsScreen from "../screens/BillsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import OperationScreen from "../screens/OperationScreen";
import BottomTabsNavigator from "./BottomTabs";
import CurrencyModal from "../modals/CurrencyModal";
import AddBillsModal from "../modals/AddBillsModal";
import { CurrencyProvider } from "../context/currencyContext";
import AddTransactionModal from "../modals/AddTransactionModal";
import SelectBillModal from "../modals/SelectBillModal";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import AddCategoryModal from "../modals/AddCategoryModal";
import IconPickerModal from "../modals/IconPickerModal";
import ColorPickerModal from "../modals/ColorPickerModal";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}>
    <CurrencyProvider>
      <Stack.Navigator>
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
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="AddBillsModal"
          component={AddBillsModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCategoryModal"
          component={AddCategoryModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IconPickerModal"
          component={IconPickerModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ColorPickerModal"
          component={ColorPickerModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionModal}
          options={{
            headerShown: false,
            presentation: "modal", 
            animation: "slide_from_bottom", 
          }}
        />
        <Stack.Screen
          name="SelectBillModal"
          component={SelectBillModal}
          options={{
            headerShown: false,
            presentation: "modal", 
            animation: "slide_from_bottom", 
          }}
        />
      </Stack.Navigator>
    </CurrencyProvider>
    </PersistGate>
    </Provider>
  );
}

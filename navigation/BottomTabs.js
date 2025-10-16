import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BillsScreen from "../screens/BillsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import OperationScreen from "../screens/OperationScreen";
import { Ionicons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "lightgreen",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#262626" }, 
      }}
    >
      <BottomTabs.Screen
        name="Bills"
        component={BillsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="card-outline" size={20} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="apps-outline" size={20} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Operation"
        component={OperationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={20} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

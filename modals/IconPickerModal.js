import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors"; 
import { iconCategories } from "../constants/icons"; 

export default function IconPickerModal() {
  const navigation = useNavigation();

  const onIconPress = (iconName) => {
    navigation.popTo("AddBillsModal", { selectedIcon: iconName });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Виберіть іконку</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {iconCategories.map((category) => (
          <View key={category.title} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.iconGrid}>
              {category.icons.map((iconName) => (
                <TouchableOpacity
                  key={iconName}
                  style={styles.iconButton}
                  onPress={() => onIconPress(iconName)}
                >
                  <Ionicons name={iconName} size={30} color={colors.white} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backButton: {
    padding: 5,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  iconButton: {
    width: "20%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    margin: "2.5%",
    backgroundColor: "#1C1C1E",
  },
});
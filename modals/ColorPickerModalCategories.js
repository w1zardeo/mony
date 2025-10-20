import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors"; 
import { COLOR_LIST } from "../constants/icons";
import ScreenWrapper from "../components/ScreenWrapper";

export default function ColorPickerModalCategories() {
  const navigation = useNavigation();

  const onColorPress = (colorValue) => {
    navigation.popTo("AddCategoryModal", { selectedColor: colorValue });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Виберіть колір</Text>
        <View style={styles.settingsButton} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.colorGrid}>
          {COLOR_LIST.map((colorValue) => (
            <TouchableOpacity
              key={colorValue}
              style={[styles.colorButton, { backgroundColor: colorValue }]}
              onPress={() => onColorPress(colorValue)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
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
    width: 34,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  settingsButton: {
    padding: 5,
    width: 34, 
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 24,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center', 
  },
  colorButton: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    margin: 12, 
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)', 
  },
});
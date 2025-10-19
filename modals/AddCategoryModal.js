import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme/colors";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory, deleteCategory } from "../store/categoriesSlice";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const categoryTypes = [
  { label: "Витрати", value: "expense" },
  { label: "Доходи", value: "income" },
];


export default function AddCategoryModal() {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const existingCategory = route.params?.category;
  const isEditMode = !!existingCategory;

  const [title, setTitle] = useState(existingCategory?.name || "");
  const [image, setImage] = useState(existingCategory?.image || null);
  const [type, setType] = useState(
    existingCategory?.type || route.params?.defaultType || "expense"
  );

  const onSave = () => {
    if (isEditMode) {
      const payload = {
        ...existingCategory,
        name: title.trim() || "Нова категорія",
        type: type,
        image: image,
        icon: image ? null : existingCategory.icon 
      };
      dispatch(updateCategory(payload));
    } else {
      const payload = {
        id: Date.now().toString(),
        name: title.trim() || "Нова категорія",
        type: type,
        image: image || null,
        icon: image ? null : "help-outline", 
      };
      dispatch(addCategory(payload));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Видалити категорію",
      `Ви впевнені, що хочете видалити "${existingCategory.name}"?`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          onPress: () => {
            dispatch(deleteCategory({ id: existingCategory.id }));
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{isEditMode ? 'Редагувати категорію' : 'Нова категорія'}</Text>
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
               <Ionicons name={isEditMode ? (existingCategory.icon || "image-outline") : "image-outline"} size={24} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Тип</Text>
          <View style={styles.rowBox}>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.dropdownSelectedText}
              data={categoryTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Витрати"}
              value={type}
              onChange={(item) => setType(item.value)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave} activeOpacity={0.8}>
          <Text style={styles.saveText}>{isEditMode ? 'Зберегти' : 'Створити'}</Text>
        </TouchableOpacity>

        {isEditMode && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
            <Text style={styles.deleteText}>Видалити категорію</Text>
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
  iconRightBox: { width: 56, height: "100%", justifyContent: "center", alignItems: "center" },
  dropdownContainer: { height: 54, borderWidth: 1, borderColor: "#d4d4d4", paddingHorizontal: 15, borderRadius: 15 },
  dropdownSelectedText: { color: colors.white, fontSize: 16 },
  dropdownItemText: { color: colors.white },
  dropdownItemContainer: { borderRadius: 15, marginHorizontal: 7 },
  dropdownListContainer: { backgroundColor: colors.black, borderRadius: 15, paddingVertical: 7, top: 5, borderColor: colors.neutral500 },
  placeholderStyle: { color: colors.white, fontSize: 16 },
  saveButton: { marginTop: 12, backgroundColor: colors.green, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  saveText: { color: colors.white, fontWeight: "600", fontSize: 16 },
  iconImage: { width: 40, height: 40, borderRadius: 8 },
  deleteButton: { marginTop: 12, backgroundColor: '#D93F3F', paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  deleteText: { color: colors.white, fontWeight: "600", fontSize: 16 },
  colorPalette: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: colors.white,
  },
});
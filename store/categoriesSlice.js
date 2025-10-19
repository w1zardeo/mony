// store/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { categoriesData, incomeCategoriesData } from "../constants/categories";

const initialState = {
  expense: categoriesData,
  income: incomeCategoriesData,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (newCategory.type === "expense") {
        state.expense.push(newCategory);
      } else {
        state.income.push(newCategory);
      }
    },
    updateCategory: (state, action) => {
      const updatedCategory = action.payload;
      const list = updatedCategory.type === "expense" ? "expense" : "income";
      
      // Перевірка, чи не змінився тип
      const otherList = updatedCategory.type === "expense" ? "income" : "expense";
      const oldIndexOther = state[otherList].findIndex(c => c.id === updatedCategory.id);
      if (oldIndexOther !== -1) {
         // Тип змінився, видаляємо зі старого списку і додаємо в новий
         state[otherList].splice(oldIndexOther, 1);
         state[list].push(updatedCategory);
      } else {
         // Тип не змінився, просто оновлюємо
         const index = state[list].findIndex(c => c.id === updatedCategory.id);
         if (index !== -1) {
           state[list][index] = updatedCategory;
         }
      }
    },
    deleteCategory: (state, action) => {
      const { id } = action.payload;
      // Потрібно шукати в обох масивах, оскільки ми можемо не знати тип при видаленні
      let index = state.expense.findIndex(c => c.id === id);
      if (index !== -1) {
        state.expense.splice(index, 1);
      } else {
        index = state.income.findIndex(c => c.id === id);
        if (index !== -1) {
          state.income.splice(index, 1);
        }
      }
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
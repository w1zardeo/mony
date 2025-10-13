// import { createSlice } from "@reduxjs/toolkit";

// const billsSlice = createSlice({
//   name: "bills",
//   initialState: {
//     list: [], // тут зберігатимуться всі рахунки
//   },
//   reducers: {
//     addBill: (state, action) => {
//       state.list.push({
//         id: Date.now().toString(),
//         title: action.payload.title,
//         balance: action.payload.balance,
//         currency: action.payload.currency || "₴",
//         type: action.payload.type || "usual",
//       });
//     },
//   },
// });

// export const { addBill } = billsSlice.actions;
// export default billsSlice.reducer;

// src/store/billsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedBill: null,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.list.push(action.payload);
    },
    setSelectedBill(state, action) {
      state.selectedBill = action.payload;
    },
    updateBillBalance(state, action) {
      const { billId, amount } = action.payload;
      const billToUpdate = state.list.find((bill) => bill.id === billId);

      if (billToUpdate) {
        // Перетворюємо поточний баланс на число, враховуючи коми
        const currentBalanceString = String(billToUpdate.balance || '0');
        const currentBalance = parseFloat(currentBalanceString.replace(",", "."));

        // Перетворюємо суму транзакції на число
        const transactionAmount = parseFloat(String(amount).replace(",", "."));
        
        // ▼▼▼ ОСЬ ТУТ ВИПРАВЛЕННЯ ▼▼▼
        // Змінили мінус (-) на плюс (+), щоб правильно обробляти від'ємні числа
        const newBalance = currentBalance + transactionAmount;
        
        // Зберігаємо баланс з двома знаками після коми
        billToUpdate.balance = newBalance.toFixed(2);
      }
    },
  },
});

export const { addBill, setSelectedBill, updateBillBalance } = billsSlice.actions;
export default billsSlice.reducer;
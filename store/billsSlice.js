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
    // Цей код виправляє помилку для СТАРИХ і НОВИХ рахунків
    updateBillBalance(state, action) {
      const { billId, amount } = action.payload;
      const billToUpdate = state.list.find((bill) => bill.id === billId);

      if (billToUpdate) {
        // ▼▼▼ ЦЕЙ РЯДОК - КЛЮЧОВИЙ ▼▼▼
        // Він примусово перетворює будь-що (число, undefined, null) на рядок перед .replace()
        const currentBalanceString = String(billToUpdate.balance || '0');
        
        const currentBalance = parseFloat(currentBalanceString.replace(",", "."));
        const transactionAmount = parseFloat(String(amount).replace(",", "."));
        
        const newBalance = currentBalance - transactionAmount;
        
        billToUpdate.balance = newBalance.toFixed(2);
      }
    },
  },
});

export const { addBill, setSelectedBill, updateBillBalance } = billsSlice.actions;
export default billsSlice.reducer;

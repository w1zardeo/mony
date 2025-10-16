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
        const currentBalanceString = String(billToUpdate.balance || '0');
        const currentBalance = parseFloat(currentBalanceString.replace(",", "."));
        const transactionAmount = parseFloat(String(amount).replace(",", "."));
        const newBalance = currentBalance + transactionAmount;
        billToUpdate.balance = newBalance.toFixed(2);
      }
    },
    
    updateBill: (state, action) => {
      const index = state.list.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteBill: (state, action) => {
      state.list = state.list.filter(bill => bill.id !== action.payload.id);
    },
  },
});

// 👇 ОНОВЛЕНО: додаємо нові екшени до експорту
export const { addBill, setSelectedBill, updateBillBalance, updateBill, deleteBill } = billsSlice.actions;

export default billsSlice.reducer;
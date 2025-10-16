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
  },
});

export const { addBill, setSelectedBill, updateBillBalance } = billsSlice.actions;
export default billsSlice.reducer;
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // користувацькі рахунки
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addBill } = billsSlice.actions;
export default billsSlice.reducer;

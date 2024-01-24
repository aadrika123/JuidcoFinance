import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./bankMasterReducer";
import chequebookMasterReducer from "./chequebookMasterReducer";
import ReceiptEntryReducer from "./ReceiptEntryReducer";
import paymentEntryReducer from "./paymentEntryReducer";

// ...
const store = configureStore({
  reducer: {
    bankDetails: bankMasterReducer,
    chequebookDetails: chequebookMasterReducer, 
    receiptDetails: ReceiptEntryReducer,
    paymentDetails: paymentEntryReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

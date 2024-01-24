import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./bankMasterReducer";
import chequebookMasterReducer from "./chequebookMasterReducer";
import ReceiptEntryReducer from "./ReceiptEntryReducer";

// ...
const store = configureStore({
  reducer: {
    bankDetails: bankMasterReducer,
    chequebookDetails: chequebookMasterReducer, 
    receiptDetails: ReceiptEntryReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

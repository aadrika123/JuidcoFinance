import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./reducers/bankMasterReducer";
import chequebookMasterReducer from "./reducers/chequebookMasterReducer";
import ReceiptEntryReducer from "./reducers/ReceiptEntryReducer";

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

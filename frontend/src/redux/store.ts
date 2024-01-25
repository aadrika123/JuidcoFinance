import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./reducers/bankMasterReducer";
import chequebookMasterReducer from "./reducers/chequebookMasterReducer";
import ReceiptEntryReducer from "./reducers/ReceiptEntryReducer";
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

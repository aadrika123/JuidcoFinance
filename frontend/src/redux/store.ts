import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./reducers/bankMasterReducer";
import chequebookMasterReducer from "./reducers/chequebookMasterReducer";
import ReceiptEntryReducer from "./reducers/ReceiptEntryReducer";
import paymentEntryReducer from "./paymentEntryReducer";
import PopupReducers from "./reducers/PopupReducers";
import selectForNoApiReducer from "./reducers/selectForNoApiReducer";
import authReducer from "./reducers/authReducer";

// ...
const store = configureStore({
  reducer: {
    bankDetails: bankMasterReducer,
    chequebookDetails: chequebookMasterReducer, 
    receiptDetails: ReceiptEntryReducer,
    paymentDetails: paymentEntryReducer,
    popup: PopupReducers,
    selectedId: selectForNoApiReducer,
    user: authReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

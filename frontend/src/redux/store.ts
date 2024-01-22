import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./bankMasterReducer";
import chequebookMasterReducer from "./chequebookMasterReducer";

// ...
const store = configureStore({
  reducer: {
    bankDetails: bankMasterReducer,
    chequebookDetails: chequebookMasterReducer    
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

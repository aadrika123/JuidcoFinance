import { configureStore } from "@reduxjs/toolkit";
import bankMasterReducer from "./bankMasterReducer";
// ...
const store = configureStore({
  reducer: {
    bankDetails: bankMasterReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

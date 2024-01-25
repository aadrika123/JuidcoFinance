import { ChequebookTableData } from "@/utils/types/chequebook_master_types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ChequebookMasterState {
  chequebookDetails: ChequebookTableData[];
}

const initialState: ChequebookMasterState = {
  chequebookDetails: [],
};

const chequebookMasterSlice = createSlice({
  name: "chequebookMaster",
  initialState,
  reducers: {
    addChequebookDetails: (state, action: PayloadAction<ChequebookTableData[]>) => {
      state.chequebookDetails = action.payload;
    },
  },
});

export const { addChequebookDetails } = chequebookMasterSlice.actions;
export default chequebookMasterSlice.reducer;

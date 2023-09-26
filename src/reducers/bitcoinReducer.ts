import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/configureStore";

export interface Data {
  id: string;
  name: string;
}

const bitcoinSlice = createSlice({
  name: "bitcoinReducer",
  initialState: [] as Data[],
  reducers: {
    bitcoinData: (state, action: PayloadAction<Data[]>) => {
      return action.payload;
    },
  },
});

export const fetchData = () => async (dispatch: any) => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');

    const bitcoinData = response.data.bpi;

    dispatch(bitcoinSlice.actions.bitcoinData(bitcoinData));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const { bitcoinData } = bitcoinSlice.actions;
export const DataSelector = (state: RootState) => state.bitcoinReducer;
export default bitcoinSlice.reducer;

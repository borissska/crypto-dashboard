import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TChartDataShortMany } from "../../shared/@types/data_types";
import { EStatus } from "../../shared/@types/user_types";
import axios from "axios";

export const getShortData = createAsyncThunk<TChartDataShortMany>(
  "data/getShortData",
  async () => {
    try {
      const response = await axios.post(`${API_URL}/tickers/getShortData`);
      return response.data;
    } catch (error) {}
  }
);

const API_URL = "http://localhost:3001";

const initialState: TChartDataShortMany = {
    dataShortMany: [],
    statusData: EStatus.EMPTY,
};

export const manyDataSlice = createSlice({
  name: "manyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShortData.pending, (state) => {
        state.statusData = EStatus.LOADING;
      })
      .addCase(getShortData.fulfilled, (state, action: PayloadAction<TChartDataShortMany>) => {
        state.dataShortMany = action.payload.dataShortMany;
        state.statusData = EStatus.SUCCESS;
      })
      .addCase(getShortData.rejected, (state) => {
        state.statusData = EStatus.ERROR;
      });
  },
});

export default manyDataSlice.reducer;

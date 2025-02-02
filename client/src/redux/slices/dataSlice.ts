import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EStatus } from "../../shared/@types/user_types";
import { TCandle, TChartData } from "../../shared/@types/data_types";

export const getData = createAsyncThunk<TCandle[], string>(
  "data/getData",
  async (ticker, { rejectWithValue }) => {
    try {
      console.log("Запрашиваем инфо по тикеру: ", ticker);
      let data;

      if (ticker) {
        const response = await axios.post(`${API_URL}/tickers/getData`, { ticker });
        data = response.data;
      } else {
        ticker = "BTC";
        const response = await axios.post(`${API_URL}/tickers/getData`, { ticker });
        data = response.data;
      }
      return data;
    } catch (error) {
      return rejectWithValue("Информация не найдена");
    }
  }
);

const initialState: TChartData = {
  ticker: "BTC",
  data: [],
  status: EStatus.EMPTY,
};

const API_URL = "http://localhost:3001";

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTicker(state, action: PayloadAction<string>) {
      state.ticker = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<TCandle[]>) => {
        state.status = EStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state) => {
        state.status = EStatus.ERROR;
      });
  },
});

export const { setTicker } = dataSlice.actions;
export default dataSlice.reducer;

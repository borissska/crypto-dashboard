import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChartDataShortAmountMany } from "../../shared/@types/portfolio_types";
import { EStatus } from "../../shared/@types/user_types";
import axios from "axios";

export const getPortfolioData = createAsyncThunk<IChartDataShortAmountMany, string>(
  "data/getPortfolioData",
  async (username) => {
    try {
      const response = await axios.post(
        `${API_URL}/tickers/getPortfolioData`,
        {
          user: username,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.data || !response.data.dataShortManyAmount) {
        throw new Error("Некорректный формат ответа от сервера");
      }

      console.log("Ответ от сервера", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных портфеля:", error);
      throw error;
    }
  }
);

const API_URL = "http://localhost:3001";

const initialState: IChartDataShortAmountMany = {
  dataShortManyAmount: [],
  statusPortfolio: EStatus.EMPTY,
};

export const portfolioData = createSlice({
  name: "portfolioData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolioData.pending, (state) => {
        state.statusPortfolio = EStatus.LOADING;
      })
      .addCase(
        getPortfolioData.fulfilled,
        (state, action: PayloadAction<IChartDataShortAmountMany>) => {
          state.dataShortManyAmount = action.payload.dataShortManyAmount;
          state.statusPortfolio = EStatus.SUCCESS;
        }
      )
      .addCase(getPortfolioData.rejected, (state) => {
        state.statusPortfolio = EStatus.ERROR;
      });
  },
});

export default portfolioData.reducer;

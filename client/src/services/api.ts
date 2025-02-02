import axios from "axios";
import { PortfolioWithTicker } from "../shared/@types/portfolio_types";

const API_URL = "http://localhost:3001";

export const login = async (username: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/users/login`, { username, password });
  return data;
};

export const register = async (username: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/users/register`, { username, password });
  return data;
};

export const addFavoriteCrypto = async (userId: number, symbol: string) => {
  const { data } = await axios.post(`${API_URL}/users/${userId}/favorites`, { symbol });
  return data;
};

export const getCryptoHistory = async (symbol: string) => {
  const { data } = await axios.get(`${API_URL}/cryptos/${symbol}`);
  return data;
};

export const addPortfolioElement = async ({ user_id, ticker, amount }: PortfolioWithTicker) => {
  console.log("addPortfolioElement отправил запрос", { user_id, ticker, amount })
  const { data } = await axios.post(`${API_URL}/tickers/addPortfolioElement`, { user_id, ticker, amount })
  console.log("addPortfolioElement вернул ответ: ", data)
  return data
}


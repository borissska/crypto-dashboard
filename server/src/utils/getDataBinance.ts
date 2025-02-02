import axios from "axios";
import fs from "fs";
import path from "path";

const BASE_URL = "https://api.binance.com/api/v3";

export const fetchCryptoHistory = async (symbol: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/klines`, {
      params: {
        symbol: symbol.toUpperCase() + "USDT",
        interval: "1d",
        limit: 100,
      },
    });

    const data = response.data.map((item: any[]) => ({
      timestamp: `${new Date(item[0]).getDate()}.${new Date(item[0]).getMonth() + 1}.${new Date(item[0]).getFullYear()}`,
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5]),
    }));

    const filePath = path.resolve(__dirname, `../../tickers/${symbol}.json`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`Данные для ${symbol} успешно обновлены`);

    // await Ticker.query().insert({
    //   symbol: symbol,
    // });
  } catch (error) {
    console.error(`Ошибка при обновлении данных для ${symbol}:`, error);
  }
};

export const fetchCryptoTickers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ticker/price`);
    return response.data.map((item: { symbol: string; price: string }) => item.symbol.replace("USDT", ""));
  } catch (error) {
    console.error("Ошибка при получении тикеров:", error);
    return [];
  }
};

import cron from "node-cron";
import { fetchCryptoHistory } from "./utils/getDataBinance";
import Ticker from "./models/Ticker";
import knex from "knex";
import objection from "objection";

const knexConfig = require("../knexfile");
const knexInstance = knex(knexConfig.development);
objection.Model.knex(knexInstance);

const updateCryptoData = async () => {
  try {
    const tickers = await Ticker.query();

    console.log("Начало обновления данных криптовалют...");
    for (const ticker of tickers) {
      try {
        await fetchCryptoHistory(ticker.ticker);
        console.log(`Обновлены данные для тикера: ${ticker.ticker}`);
      } catch (err) {
        console.error(`Ошибка обновления данных для тикера ${ticker.ticker}:`);
      }
    }
  } catch (err) {
    console.error("Ошибка при получении списка тикеров:", err);
  }
};

cron.schedule("* * * * *", async () => {
  console.log("Запуск задачи обновления данных...");
  await updateCryptoData();
});

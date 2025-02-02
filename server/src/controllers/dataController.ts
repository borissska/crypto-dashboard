import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import User from "../models/User";
import Portfolio from "../models/Portfolio";
import Ticker from "../models/Ticker";

export type TCandleShort = {
  timestamp: string;
  close: number;
};

export type TChartDataShort = {
  tickerName: string;
  candleShortMany: TCandleShort[];
};

export type TChartDataShortMany = {
  dataShortMany: TChartDataShort[];
};

export interface IChartDataShortAmount extends TChartDataShort {
  amount: number;
}

export interface IChartDataShortAmountMany {
  dataShortManyAmount: IChartDataShortAmount[];
}

export interface PortfolioWithTicker {
  ticker: string;
  amount: number;
}

export type TCandle = {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const DATA_DIR = path.join(__dirname, "../../tickers/");

export const getData = async (req: Request, res: Response) => {
  const { ticker } = req.body;
  const filePath = path.join(DATA_DIR, `${ticker}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: filePath });
      return;
    }

    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const cryptoData = JSON.parse(fileData);

    res.status(200).json(cryptoData);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обработке файла: " + error });
  }
};

export const getShortData = async (req: Request, res: Response) => {
  const manyData: TChartDataShortMany = {
    dataShortMany: [],
  };

  try {
    const tickers = await Ticker.query();
    tickers.forEach(async (ticker) => {
      const filePath = path.join(DATA_DIR, `${ticker.ticker}.json`);

      const cryptoData: TCandle[] = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
      const newData: TCandleShort[] = [];
      cryptoData.forEach((el: TCandle) => {
        newData.push({ timestamp: el.timestamp, close: el.close } as TCandleShort);
      });

      manyData.dataShortMany.push({
        tickerName: ticker.ticker,
        candleShortMany: newData.splice(-100),
      });

      if (manyData.dataShortMany.length == tickers.length) {
        res.status(200).json(manyData);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обработке файла: " + error });
  }
};

export const getPortfolioData = async (req: Request, res: Response) => {
  const username = req.body.user;
  console.log(username)

  const manyData: IChartDataShortAmountMany = {
    dataShortManyAmount: [],
  };

  try {
    const user = await User.query().where("username", username);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const tickers = await Portfolio.query()
      .where("user_id", user[0].id)
      .join("tickers", "portfolios.ticker_id", "=", "tickers.id")
      .select("tickers.ticker", "portfolios.amount") as unknown as PortfolioWithTicker[];

    for (const ticker of tickers) {
      const filePath = path.join(DATA_DIR, `${ticker.ticker}.json`);
      console.log(`Чтение файла: ${filePath}`);

      try {
        const fileContent = await fs.promises.readFile(filePath, "utf-8");
        const cryptoData: TCandle[] = JSON.parse(fileContent);
        const newData: TCandleShort[] = cryptoData.map((el) => ({
          timestamp: el.timestamp,
          close: el.close,
        }));

        manyData.dataShortManyAmount.push({
          tickerName: ticker.ticker,
          amount: ticker.amount,
          candleShortMany: newData.slice(-100),
        });
      } catch (fileError) {
        console.error(`Ошибка чтения файла для тикера ${ticker.ticker}:`, fileError);
        res.status(500).json({ error: `Ошибка чтения данных для тикера ${ticker.ticker}` });
      }
    }
    console.log("Все данные обработаны");
    res.status(200).json(manyData);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обработке файла: " + error });
  }
};

export const addPortfolioElement = async (req: Request, res: Response) => {
  const { user_id, ticker, amount } = req.body;

  try {
    console.log("addPortfolioElement пришел запрос на сервер: ", req.body)
    const nticker = await Ticker.query().where("ticker", ticker)

    console.log("addPortfolioElement найден тикер: ", nticker[0])
    const portfolio_el = await Portfolio.query().insert({
      user_id: user_id,
      ticker_id: nticker[0].id,
      amount: amount,
    });

    console.log("addPortfolioElement добавлен элемент: ", portfolio_el)
    res.status(200).json(portfolio_el)
  } catch (err) {
    res.status(500).json({ err: "Ошибка добавления элемента в портфолио" })
  }
}

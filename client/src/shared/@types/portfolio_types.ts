import { TChartDataShort } from "./data_types";
import { EStatus } from "./user_types";

export interface IChartDataShortAmount extends TChartDataShort {
  amount: number;
}

export interface IChartDataShortAmountMany {
  dataShortManyAmount: IChartDataShortAmount[];
  statusPortfolio: EStatus;
}

export interface PortfolioWithTicker {
  user_id: number;
  ticker: string;
  amount: number;
}

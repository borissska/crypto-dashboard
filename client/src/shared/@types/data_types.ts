import { EStatus } from "./user_types";

export type TCandle = {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type TCandleShort = {
  timestamp: string;
  close: number;
}

export type TChartData = {
  ticker: string;
  data: TCandle[];
  status: EStatus;
};

export type TChartDataShort = {
  tickerName: string;
  candleShortMany: TCandleShort[];
};

export interface IChartDataShortPossibleAmount extends TChartDataShort {
  amount?: number;
};

export type TChartDataShortMany = {
  dataShortMany: TChartDataShort[];
  statusData: EStatus;
};

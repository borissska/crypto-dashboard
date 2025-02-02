import { Model } from "objection";

class Ticker extends Model {
  id!: number;
  ticker!: string;
  name?: string;

  static get tableName() {
    return "tickers";
  }
}

export default Ticker;
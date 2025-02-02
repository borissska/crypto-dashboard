import { Model, RelationMappings } from "objection";
import User from "./User";
import Ticker from "./Ticker";

class Portfolio extends Model {
  id!: number;
  user_id!: number;
  ticker_id!: number;
  amount!: number;

  static get tableName() {
    return "portfolios";
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "portfolios.user_id",
          to: "users.id",
        },
      },
      ticker: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ticker,
        join: {
            from: "portfolios.ticker_id",
            to: "tickers.id",
        }
      }
    };
  }
}

export default Portfolio;
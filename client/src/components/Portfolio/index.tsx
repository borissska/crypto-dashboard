import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TCandleShort } from "../../shared/@types/data_types";
import { EStatus } from "../../shared/@types/user_types";
import { getPortfolioData } from "../../redux/slices/portfolioDataSlice";
import TickerChart from "../TickerChart";
import ShortDataModule from "../ShortDataModule";

const Portfolio: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataShortManyAmount, statusPortfolio } = useAppSelector((state) => state.portfolioData);
  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (user) dispatch(getPortfolioData(user.username));
  }, [user])

  const cumulativeData: TCandleShort[] = React.useMemo(() => {
    const summData: TCandleShort[] = [];
    if (statusPortfolio === EStatus.SUCCESS) {
      if (dataShortManyAmount) {
        dataShortManyAmount.forEach((ticker) => {
          ticker.candleShortMany.forEach((candle, id) => {
            if (summData[id]) {
              summData[id] = {
                ...summData[id],
                close: summData[id].close + candle.close * ticker.amount,
              };
            } else {
              summData[id] = {
                ...candle,
                close: candle.close * ticker.amount,
               };
            }
          });
        });
      }
      return summData;
    } else {
      return [];
    }
  }, [dataShortManyAmount]);

  return (
    <>
      {statusPortfolio === EStatus.SUCCESS
        ? cumulativeData && (
            <div style={{display: "flex"}}>
              <ShortDataModule moduleType={"portfolioData"}/>
              <TickerChart data={cumulativeData} ticker={"Cumulitive"} />
            </div>
          )
        : "Loading"}
    </>
  );
};

export default Portfolio;

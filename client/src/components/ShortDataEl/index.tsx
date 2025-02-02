import React from "react";
import styles from "./ShortDataEl.module.scss";
import ShortDataChart from "../ShortDataChart";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTicker } from "../../redux/slices/dataSlice";
import { IChartDataShortAmount } from "../../shared/@types/portfolio_types";

const ShortDataEl: React.FC<IChartDataShortAmount> = ({ tickerName, amount, candleShortMany }) => {
  const dispatch = useAppDispatch();
  const { ticker } = useAppSelector((state) => state.data);

  return (
    <div
      className={
        ticker === tickerName
          ? `${styles.review_el} ${styles.review_el_active}`
          : `${styles.review_el}`
      }
      onClick={() => dispatch(setTicker(tickerName))}
    >
      <div className={styles.info}>
        <div className={styles.info_ticker}>{tickerName}</div>
        <div className={styles.info_amount}>{amount === 0 ? "" : `amount: ${amount}`}</div>
      </div>
      <div className={styles.chart}>
        <ShortDataChart tickerName={ticker} candleShortMany={candleShortMany} />
      </div>
    </div>
  );
};

export default ShortDataEl;

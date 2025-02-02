import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getShortData } from "../../redux/slices/manyDataSlice";
import { EStatus } from "../../shared/@types/user_types";
import ShortDataEl from "../ShortDataEl";
import styles from './ShortDataPreview.module.scss';

type TShortDataModule = {
  moduleType: string
}

const ShortDataModule: React.FC<TShortDataModule> = ({ moduleType }) => {
  const { dataShortMany, statusData } = useAppSelector((state) => state.manyData);
  const { dataShortManyAmount, statusPortfolio } = useAppSelector((state) => state.portfolioData)
  const dispatch = useAppDispatch();
  let items, status: EStatus;

  if (moduleType === "manyData") {
    items = dataShortMany.map((el, id) => <ShortDataEl key={id} tickerName={el.tickerName} amount={0} candleShortMany={el.candleShortMany}/>);
    status = statusData
  } else {
    items = dataShortManyAmount.map((el, id) => <ShortDataEl key={id} {...el}/>);
    status = statusPortfolio
  }

  React.useEffect(() => {
    dispatch(getShortData());
  }, []);

  return (
    <div className={styles.data_preview}>
      <ul>
        {status === EStatus.SUCCESS
          ? items
          : "Loading"}
      </ul>
    </div>
  );
};

export default ShortDataModule;

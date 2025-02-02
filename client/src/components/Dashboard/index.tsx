import {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES,
  useEffect,
  useLayoutEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getData, setTicker } from "../../redux/slices/dataSlice";
import styles from "./Dashboard.module.scss";
import TickerChart from "../TickerChart";
import { EStatus } from "../../shared/@types/user_types";
import ShortDataModule from "../ShortDataModule";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../shared/ui/CustomButton";
import AddPortfolioElement from "../AddPortfolioElement";

const Dashboard = () => {
  const { data, ticker, status } = useAppSelector((state) => state.data);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(getData(ticker));
    console.log("Сработал dispatch");
  }, [ticker]);

  console.log("Символ поменялся");

  return (
    <div className={styles.dashboard}>
      <section className={styles.dashboard_content}>
        <div className={styles.dashboard_content_leftrow}>
          <ShortDataModule moduleType={"manyData"}/>
        </div>
        <div className={styles.dashboard_content_rightrow}>
          <div className={styles.dashboard_title}>
            <h2>График {ticker}</h2>
          </div>
          {status === EStatus.SUCCESS && (
            <div>
              <div>
                <TickerChart ticker={ticker} data={data} />
              </div>
              <div>
                {user ? (<AddPortfolioElement ticker={ticker} />) : (<CustomButton onClick={() => navigate("/login")}>Login</CustomButton>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

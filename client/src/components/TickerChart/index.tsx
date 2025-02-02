import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { TCandle, TCandleShort } from "../../shared/@types/data_types";
import styles from "./TickerChart.module.scss";

type TTickerChart = {
  ticker: string;
  data: TCandle[] | TCandleShort[];
};

const TickerChart: React.FC<TTickerChart> = ({ data }) => {

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='colorData' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#16B7BA' stopOpacity={1} />
              <stop offset='95%' stopColor='#16B7BA' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey='timestamp' 
            interval={9} 
            tick={{fill: '#16B7BA'}} 
            tickLine={{stroke: '#16B7BA'}}
            axisLine={{stroke: '#16B7BA'}}
            tickMargin={7} 
          />
          <YAxis
            dataKey='close'
            domain={['auto', 'auto']}
            tick={{fill: '#16B7BA'}} 
            tickLine={{stroke: '#16B7BA'}}
            axisLine={{stroke: '#16B7BA'}}
            tickMargin={7}
          />
          <Tooltip contentStyle={{ color: '#16B7BA', backgroundColor: "transparent", borderColor: '#16B7BA' }} />
          <Area dataKey='close' stroke='#16B7BA' fill='url(#colorData)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TickerChart;

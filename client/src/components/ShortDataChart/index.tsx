import React from "react";
import { XAxis, YAxis, AreaChart, Area, ResponsiveContainer } from "recharts";
import { TChartDataShort } from "../../shared/@types/data_types";

const ShortDataChart: React.FC<TChartDataShort> = ({ tickerName, candleShortMany }) => {
  const [bottom, top] = [
    React.useRef(candleShortMany[0].close),
    React.useRef(candleShortMany[0].close),
  ];

  candleShortMany.forEach((el) => {
    if (el.close > top.current) top.current = el.close;
    if (el.close < bottom.current) bottom.current = el.close;
  });

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={candleShortMany} style={{cursor: "pointer"}}>
        <defs>
          <linearGradient id='colorData' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#16B7BA' stopOpacity={1} />
            <stop offset='95%' stopColor='#16B7BA' stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis
          hide={true}
          domain={[bottom.current * 0.98, top.current * 1.02]}
        />
        <Area dataKey='close' stroke='#16B7BA' fill='url(#colorData)' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ShortDataChart;

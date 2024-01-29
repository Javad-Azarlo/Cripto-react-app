import React, { useState } from "react";
import styles from "../Modules/Chart.module.css";
import { ConvertDta } from "../../Helper/ConvertData";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  Line,
  XAxis,
  Legend,
  Tooltip,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const inner = e.target.innerText.toLowerCase().replace(' ' , '_');
      setType(inner)
    } else {
      return;
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.item.image} />
          <p>{chart.item.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartGraph data={ConvertDta(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type  === "prices"? styles.selected : null}>Prices</button>
          <button className={type  === "market_caps"? styles.selected : null}>Market Caps</button>
          <button className={type  === "total_volumes"? styles.selected : null}>Total Volumes</button>
        </div>
        <div className={styles.details}>
          <div>
            <p>
              Prices : <span>$ {chart.item.current_price}</span>
            </p>
          </div>
          <div>
            <p>
              ATH : <span>$ {chart.item.ath}</span>
            </p>
          </div>
          <div>
            <p>
              Market Cap : <span>$ {chart.item.market_cap}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

function ChartGraph({ data, type }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type={"monotone"}
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey={"date"} />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

import React from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets//chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "../Modules/TableCoin.main.module.css";
import { GoChart } from "../../Services/CriptoApi";

function TableCoin({ currency, coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeWidth="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((item) => (
              <TableRow
                currency={currency}
                key={item.id}
                item={item}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ item, currency, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  } = item;
  const chartHandler = async (e) => {
    try {
      const res = await fetch(GoChart(id));
      const jsn = await res.json();
      setChart( { ...jsn , item});
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr onClick={chartHandler}>
      <td>
        <div className={styles.symbol}>
          <img style={{ width: "20%" }} src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd"
          ? `$ ${current_price.toLocaleString()}`
          : `# ${current_price.toLocaleString()}`}
      </td>

      <td className={price_change > 0 ? styles.sucssess : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};

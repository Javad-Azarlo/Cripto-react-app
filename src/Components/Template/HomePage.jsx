import React, { useEffect, useState } from "react";
import TableCoin from "../Modules/TableCoin";
import { GetCoinList } from "../../Services/CriptoApi";
import Pagination from "../Modules/Pagination";
import Search from "../Modules/Search";
import Chart from "../Modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoding] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoding(true);
        const res = await fetch(GetCoinList(page, currency));
        const jsn = await res.json();
        setCoins(jsn);
        setIsLoding(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin currency={currency} coins={coins} isLoading={isLoading} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart}/>}
    </div>
  );
}

export default HomePage;

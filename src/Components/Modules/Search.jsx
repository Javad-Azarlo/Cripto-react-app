import React, { useEffect, useState } from "react";
import { GoSearch } from "../../Services/CriptoApi";
import { RotatingLines } from "react-loader-spinner";
import styles from "../Modules/Search.module.css";

function Search({ currency, setCurrency }) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [cons, setCons] = useState([]);
  const changeHandler = (event) => {
    const value = event.target.value;
    setCurrency(value);
  };
  useEffect(() => {
    setIsLoading(true);
    setCons([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const controller = new AbortController();
    const getSearch = async () => {
      try {
        const res = await fetch(GoSearch(text), { signal: controller.signal });
        const jsn = await res.json();
        if(jsn.coins) {
          setCons(jsn.coins);
          setIsLoading(false);
        } else {
          alert(jsn.status.error_message);
        }
        console.log(cons);
        console.log(jsn);
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true)
    getSearch();
    return () => {
      controller.abort();
    };
  }, [text]);
  return (
    <div className={styles.SearchBox}>
      <input
        type="text"
        placeholder="Search..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={changeHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!cons.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines strokeWidth="#3874ff" />
          )}
          <ul>
            {cons.map((item) => (
              <li key={item.id}>
                <img src={item.thumb} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

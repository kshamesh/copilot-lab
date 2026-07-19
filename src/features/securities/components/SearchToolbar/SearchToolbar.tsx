import { useState } from "react";

import styles from "./SearchToolbar.module.css";

import type { SecuritySearchCriteria, SearchToolbarProps } from "./types";

export function SearchToolbar({ onSearch }: SearchToolbarProps) {
  const [ticker, setTicker] = useState("");

  const [isin, setIsin] = useState("");

  const handleSearch = () => {
    const criteria: SecuritySearchCriteria = {
      ticker,
      isin,
    };

    onSearch(criteria);
  };

  return (
    <div className={styles.container}>
      <input
        placeholder="Ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      <input
        placeholder="ISIN"
        value={isin}
        onChange={(e) => setIsin(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

import { useRef, useCallback } from "react";
import { SearchToolbar } from "../SearchToolbar/SearchToolbar";
import { SearchResultGrid } from "../grids/SearchResultGrid/SearchResultGrid";
import { GiftToolbar } from "../GiftToolbar/GiftToolbar";
import { UserSecuritiesGrid } from "../grids/UserSecuritiesGrid/UserSecuritiesGrid";
import { UserGiftsGrid } from "../grids/UserGiftsGrid/UserGiftsGrid";
import type { SecuritySearchCriteria } from "../SearchToolbar/types";
import type { SearchResultGridRef } from "../grids/SearchResultGrid/types";
import styles from "./SecurityPage.module.css";

export function SecurityPage() {
  const searchGridRef = useRef<SearchResultGridRef>(null);

  const handleSearch = useCallback((criteria: SecuritySearchCriteria) => {
    // Phase 3
    // const datasource = createSecurityDatasource(criteria);

    // searchResultGridRef.current?.setDatasource(datasource);

    console.log(criteria);
  }, []);

  return (
    <div className={styles.container}>
      <SearchToolbar onSearch={handleSearch} />

      <SearchResultGrid ref={searchGridRef} />

      <GiftToolbar />

      <UserSecuritiesGrid />

      <UserGiftsGrid />
    </div>
  );
}

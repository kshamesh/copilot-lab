import { useRef, useCallback } from "react";
import { SearchResultGrid } from "../grids/SearchResultGrid/SearchResultGrid";
import { UserSecuritiesGrid } from "../grids/UserSecuritiesGrid/UserSecuritiesGrid";
import { UserGiftsGrid } from "../grids/UserGiftsGrid/UserGiftsGrid";
import type { SearchResultGridRef } from "../grids/SearchResultGrid/types";
import styles from "./SecurityPage.module.css";
import { createSecuritySearchDatasource } from "../../dataSources/createSecuritySearchDatasource";
import type { SearchSecurityRequest } from "../SearchToolbar/types";
import { SearchToolbar } from "../searchToolbar/SearchToolbar";
import { GiftToolbar } from "../giftToolbar/GiftToolbar";

export function SecurityPage() {
  const searchGridRef = useRef<SearchResultGridRef>(null);

  const handleSearch = useCallback((criteria: SearchSecurityRequest) => {
    const datasource = createSecuritySearchDatasource({
      criteria,
    });

    searchGridRef.current?.setDatasource(datasource);
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

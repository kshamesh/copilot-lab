export interface SecuritySearchCriteria {
  ticker: string;

  isin: string;
}

export interface SearchToolbarProps {
  onSearch(criteria: SecuritySearchCriteria): void;
}

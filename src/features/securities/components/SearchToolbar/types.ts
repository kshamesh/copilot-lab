export interface SearchSecurityRequest {
  ticker: string;

  isin: string;

  startRow: number;

  endRow: number;
}

export interface SearchToolbarProps {
  onSearch(criteria: SearchSecurityRequest): void;
}

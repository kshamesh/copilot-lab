// models/Security.ts

export interface Security {
  id: string;

  isin: string;

  cusip: string;

  ticker: string;

  description: string;

  market: string;

  giftType?: string;

  quantity?: number;

  comments?: string;

  recipient?: string;

  giftReason?: string;
}

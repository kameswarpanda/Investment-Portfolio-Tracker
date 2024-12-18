export interface Stock {
  id?: number;
  stockName: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice?: number;
  totalValue?: number;
}

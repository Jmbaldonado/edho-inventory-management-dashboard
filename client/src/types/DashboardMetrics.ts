import { ExpenseByCategorySummary } from "./ExpenseByCategorySummary";
import { ExpenseSummary } from "./ExpenseSummary";
import { Product } from "./Product";
import { PurchaseSummary } from "./PurchaseSummary";
import { SalesSummary } from "./SalesSummary";

export type DashboardMetrics = {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
};

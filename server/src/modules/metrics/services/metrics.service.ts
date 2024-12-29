import { ExpenseByCategoryService } from '@modules/expense-by-category/services/expense-by-category.service';
import { ExpenseSummaryService } from '@modules/expense-summary/services/expense-summary.service';
import { ProductsService } from '@modules/products/services/products.service';
import { PurchaseSummaryService } from '@modules/purchase-summary/services/purchase-summary.service';
import { SaleSummaryService } from '@modules/sale-summary/services/sale-summary.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
    constructor(
        private readonly productsService: ProductsService,
        private readonly saleSummaryService: SaleSummaryService,
        private readonly purchaseSummaryService: PurchaseSummaryService,
        private readonly expenseSummaryService: ExpenseSummaryService,
        private readonly expenseByCategoryService: ExpenseByCategoryService,
    ) {}

    async getEDashboardMetrics() {
        const popularProducts = await this.productsService.getProducts(15);
        const salesSummary = await this.saleSummaryService.getSaleSummary(5);
        const purchaseSummary =
            await this.purchaseSummaryService.getPurchaseSummary(5);
        const expenseSummary =
            await this.expenseSummaryService.getExpenseSummary(5);
        const expenseByCategoryRaw =
            await this.expenseByCategoryService.getExpenseByCategory(5);

        const expenseByCategorySummary = expenseByCategoryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString(),
        }));

        return {
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        };
    }
}

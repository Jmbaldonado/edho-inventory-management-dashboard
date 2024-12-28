import { ExpenseByCategoryModule } from '@modules/expense-by-category/expense-by-category.module';
import { ExpenseSummaryModule } from '@modules/expense-summary/expense-summary.module';
import { ProductsModule } from '@modules/products/products.module';
import { PurchaseSummaryModule } from '@modules/purchase-summary/purchase-summary.module';
import { SaleSummaryModule } from '@modules/sale-summary/sale-summary.module';
import { Module } from '@nestjs/common';
import { MetricsController } from './controllers/metrics.controller';
import { MetricsService } from './services/metrics.service';

@Module({
    imports: [
        ProductsModule,
        SaleSummaryModule,
        PurchaseSummaryModule,
        ExpenseSummaryModule,
        ExpenseByCategoryModule,
    ],
    providers: [MetricsService],
    controllers: [MetricsController],
    exports: [MetricsService],
})
export class MetricsModule {}

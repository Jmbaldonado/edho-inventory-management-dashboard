import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} from 'config/environment';
import { ProductsModule } from './modules/products/products.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { SalesModule } from './modules/sales/sales.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PurchaseSummaryModule } from './modules/purchase-summary/purchase-summary.module';
import { ExpenseSummaryModule } from './modules/expense-summary/expense-summary.module';
import { ExpenseByCategoryModule } from './modules/expense-by-category/expense-by-category.module';
import { SaleSummaryModule } from './modules/sale-summary/sale-summary.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: [__dirname + '/data/entities/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ProductsModule,
        MetricsModule,
        SalesModule,
        PurchasesModule,
        ExpensesModule,
        PurchaseSummaryModule,
        ExpenseSummaryModule,
        ExpenseByCategoryModule,
        SaleSummaryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} from 'config/environment';
import { LogResponseInterceptor } from './interceptors/logResponse.interceptor';
import { LogRequestMiddleware } from './middlewares/logRequest.middleware';
import { RTracerMiddleware } from './middlewares/rTracer.middleware';
import { ExpenseByCategoryModule } from './modules/expense-by-category/expense-by-category.module';
import { ExpenseSummaryModule } from './modules/expense-summary/expense-summary.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { ProductsModule } from './modules/products/products.module';
import { PurchaseSummaryModule } from './modules/purchase-summary/purchase-summary.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { SaleSummaryModule } from './modules/sale-summary/sale-summary.module';
import { SalesModule } from './modules/sales/sales.module';

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
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LogResponseInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RTracerMiddleware, LogRequestMiddleware).forRoutes('*');
    }
}

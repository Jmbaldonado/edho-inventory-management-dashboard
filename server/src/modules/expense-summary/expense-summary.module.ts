import { ExpenseSummary } from '@entities/expenseSummary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseSummaryService } from './services/expense-summary.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExpenseSummary])],
    controllers: [],
    providers: [ExpenseSummaryService],
    exports: [ExpenseSummaryService],
})
export class ExpenseSummaryModule {}

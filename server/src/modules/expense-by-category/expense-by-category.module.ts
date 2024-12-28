import { ExpenseByCategory } from '@entities/expenseByCategory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseByCategoryService } from './services/expense-by-category.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExpenseByCategory])],
    controllers: [],
    providers: [ExpenseByCategoryService],
    exports: [ExpenseByCategoryService],
})
export class ExpenseByCategoryModule {}

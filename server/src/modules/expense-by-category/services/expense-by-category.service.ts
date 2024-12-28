import { ExpenseByCategory } from '@entities/expenseByCategory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseByCategoryService {
    constructor(
        @InjectRepository(ExpenseByCategory)
        private readonly repository: Repository<ExpenseByCategory>,
    ) {}

    async getExpenseByCategory(
        limit: number = 30,
        offset: number = 1,
    ): Promise<ExpenseByCategory[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { date: 'DESC' },
        });
    }
}

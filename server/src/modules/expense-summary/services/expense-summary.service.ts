import { ExpenseSummary } from '@entities/expenseSummary.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseSummaryService {
    constructor(
        @InjectRepository(ExpenseSummary)
        private readonly repository: Repository<ExpenseSummary>,
    ) {}

    async getExpenseSummary(
        limit: number = 30,
        offset: number = 1,
    ): Promise<ExpenseSummary[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { date: 'DESC' },
        });
    }
}

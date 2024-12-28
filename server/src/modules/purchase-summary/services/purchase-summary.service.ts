import { PurchaseSummary } from '@entities/purchaseSummary.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseSummaryService {
    constructor(
        @InjectRepository(PurchaseSummary)
        private readonly repository: Repository<PurchaseSummary>,
    ) {}

    async getPurchaseSummary(
        limit: number = 30,
        offset: number = 1,
    ): Promise<PurchaseSummary[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { date: 'DESC' },
        });
    }
}

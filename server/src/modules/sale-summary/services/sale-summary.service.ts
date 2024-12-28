import { SaleSummary } from '@entities/saleSummary.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SaleSummaryService {
    constructor(
        @InjectRepository(SaleSummary)
        private readonly repository: Repository<SaleSummary>,
    ) {}

    async getSaleSummary(
        limit: number = 30,
        offset: number = 1,
    ): Promise<SaleSummary[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { date: 'DESC' },
        });
    }
}

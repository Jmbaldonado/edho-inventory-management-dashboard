import { Sale } from '@entities/sale.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private readonly repository: Repository<Sale>,
    ) {}

    async getSales(limit: number = 30, offset: number = 1): Promise<Sale[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { timestamp: 'DESC' },
        });
    }
}

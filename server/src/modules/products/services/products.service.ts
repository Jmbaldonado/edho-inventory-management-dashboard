import { Product } from '@entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
    ) {}

    async getProducts(
        limit: number = 30,
        offset: number = 1,
    ): Promise<Product[]> {
        return this.repository.find({
            take: limit,
            skip: offset,
            order: { stockQuantity: 'DESC' },
        });
    }
}

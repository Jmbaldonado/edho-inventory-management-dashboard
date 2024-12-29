import { Product } from '@entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
    ) {}

    async getProducts(
        limit: number = 30,
        offset: number = 1,
        search?: string,
    ): Promise<Product[]> {
        const queryOptions: {
            where?: { name: FindOperator<string> };
            take?: number;
            skip?: number;
            order?: { stockQuantity: 'DESC' | 'ASC' };
        } = {};

        if (search) {
            queryOptions.where = { name: Like(`%${search}%`) };
        } else {
            queryOptions.take = limit;
            queryOptions.skip = offset;
            queryOptions.order = { stockQuantity: 'DESC' };
        }

        return this.repository.find(queryOptions);
    }

    async createProduct(product: CreateProductDto): Promise<Product> {
        return this.repository.save(product);
    }
}

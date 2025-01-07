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
        pageSize?: number,
        page?: number,
        search?: string,
    ): Promise<[Product[], number]> {
        const queryOptions: {
            where?: { name: FindOperator<string> };
            take?: number;
            skip?: number;
            order?: { stockQuantity: 'DESC' | 'ASC' };
        } = {};

        if (search) {
            queryOptions.where = { name: Like(`%${search}%`) };
        }

        // Apply pagination only if pageSize and page are provided
        if (pageSize && page) {
            queryOptions.take = pageSize;
            queryOptions.skip = (page - 1) * pageSize;
        }

        // Always order by stockQuantity in descending order unless overridden
        queryOptions.order = { stockQuantity: 'DESC' };

        return this.repository.findAndCount(queryOptions);
    }

    async createProduct(product: CreateProductDto): Promise<Product> {
        return this.repository.save(product);
    }
}

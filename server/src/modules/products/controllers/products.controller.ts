import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    async getProducts(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ) {
        return await this.productsService.getProducts(limit, offset);
    }
}

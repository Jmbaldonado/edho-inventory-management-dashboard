import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    async getProducts(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('search') search: string,
    ) {
        return this.productsService.getProducts(limit, offset, search);
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return this.productsService.createProduct(product);
    }
}

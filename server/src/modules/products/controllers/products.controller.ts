import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    async getProducts(
        @Query('pageSize') pageSize: number,
        @Query('page') page: number,
        @Query('search') search: string,
    ) {
        const [products, totalProducts] =
            await this.productsService.getProducts(pageSize, page, search);
        return {
            data: products,
            metadata: {
                current_page: +page,
                total_records: totalProducts,
                max_pages: Math.ceil(totalProducts / pageSize) || 1,
            },
        };
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return this.productsService.createProduct(product);
    }
}

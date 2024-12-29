import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
    @IsString({
        message: 'name must be a string',
    })
    name: string;

    @IsNumber(
        {},
        {
            message: 'price must be a number',
        },
    )
    price: number;

    @IsNumber(
        {},
        {
            message: 'stockQuantity must be a number',
        },
    )
    stockQuantity: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;
}

import { Sale } from '@entities/sale.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './services/sales.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sale])],
    controllers: [],
    providers: [SalesService],
    exports: [SalesService],
})
export class SalesModule {}

import { PurchaseSummary } from '@entities/purchaseSummary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseSummaryService } from './services/purchase-summary.service';

@Module({
    imports: [TypeOrmModule.forFeature([PurchaseSummary])],
    controllers: [],
    providers: [PurchaseSummaryService],
    exports: [PurchaseSummaryService],
})
export class PurchaseSummaryModule {}

import { SaleSummary } from '@entities/saleSummary.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleSummaryService } from './services/sale-summary.service';

@Module({
    imports: [TypeOrmModule.forFeature([SaleSummary])],
    providers: [SaleSummaryService],
    exports: [SaleSummaryService],
})
export class SaleSummaryModule {}

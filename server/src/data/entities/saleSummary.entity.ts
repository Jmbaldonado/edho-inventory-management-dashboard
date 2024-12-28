import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sale_summary' })
export class SaleSummary {
    @PrimaryGeneratedColumn('uuid')
    salesSummaryId: string;

    @Column({ type: 'float' })
    totalValue: number;

    @Column({ type: 'float', nullable: true })
    changePercentage?: number;

    @Column({ type: 'timestamp' })
    date: Date;
}

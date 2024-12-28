import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'purchase_summary' })
export class PurchaseSummary {
    @PrimaryGeneratedColumn('uuid')
    purchaseSummaryId: string;

    @Column({ type: 'float' })
    totalPurchased: number;

    @Column({ type: 'float', nullable: true })
    changePercentage?: number;

    @Column({ type: 'timestamp' })
    date: Date;
}

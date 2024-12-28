import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'expenses' })
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    expenseId: string;

    @Column()
    category: string;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'timestamp' })
    timestamp: Date;
}

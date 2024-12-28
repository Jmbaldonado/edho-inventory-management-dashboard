import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpenseSummary } from './expenseSummary.entity';

@Entity({ name: 'expenses_by_category' })
export class ExpenseByCategory {
    @PrimaryGeneratedColumn('uuid')
    expenseByCategoryId: string;

    @Column()
    expenseSummaryId: string;

    @Column()
    category: string;

    @Column({ type: 'bigint' })
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(
        () => ExpenseSummary,
        (expenseSummary) => expenseSummary.expensesByCategory,
    )
    @JoinColumn({ name: 'expenseSummaryId' })
    expenseSummary: ExpenseSummary;
}

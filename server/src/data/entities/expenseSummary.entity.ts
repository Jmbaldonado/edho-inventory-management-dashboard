import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenseByCategory } from './expenseByCategory.entity';

@Entity({ name: 'expense_summary' })
export class ExpenseSummary {
    @PrimaryGeneratedColumn('uuid')
    expenseSummaryId: string;

    @Column({ type: 'float' })
    totalExpenses: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @OneToMany(
        () => ExpenseByCategory,
        (expenseByCategory) => expenseByCategory.expenseSummary,
    )
    expensesByCategory: ExpenseByCategory[];
}

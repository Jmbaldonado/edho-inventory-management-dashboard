import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'sales' })
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    saleId: string;

    @Column()
    productId: string;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @Column()
    quantity: number;

    @Column({ type: 'float' })
    unitPrice: number;

    @Column({ type: 'float' })
    totalAmount: number;

    @ManyToOne(() => Product, (product) => product.sales)
    @JoinColumn({ name: 'productId' })
    product: Product;
}

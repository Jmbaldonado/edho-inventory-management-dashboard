import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'purchases' })
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    purchaseId: string;

    @Column()
    productId: string;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @Column()
    quantity: number;

    @Column({ type: 'float' })
    unitCost: number;

    @Column({ type: 'float' })
    totalCost: number;

    @ManyToOne(() => Product, (product) => product.purchases)
    @JoinColumn({ name: 'productId' })
    product: Product;
}

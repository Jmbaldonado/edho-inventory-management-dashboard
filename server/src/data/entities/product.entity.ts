import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Sale } from './sale.entity';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column()
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'float', nullable: true })
    rating?: number;

    @Column()
    stockQuantity: number;

    @OneToMany(() => Sale, (sale) => sale.product)
    sales: Sale[];

    @OneToMany(() => Purchase, (purchase) => purchase.product)
    purchases: Purchase[];
}

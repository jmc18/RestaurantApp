import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {CategoryProduct} from './CategoryProduct'

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    productId: string

    @Column()
    prodctName: string

    @Column({type: 'float'})
    unitPrice: number

    @ManyToOne(() => CategoryProduct, categoryProduct => categoryProduct.products)
    categoryProducts: CategoryProduct;
}
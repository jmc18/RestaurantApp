import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import {CategoryProduct} from './CategoryProduct'
import {OrderDetail} from './OrderDetail'
import { ProductPackageDetail } from './ProductPackageDetail'

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

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetailProduct: OrderDetail[]

    @OneToMany(() => ProductPackageDetail, productPackageDetail => productPackageDetail.product)
    public productPackageDetail!: ProductPackageDetail[];
}
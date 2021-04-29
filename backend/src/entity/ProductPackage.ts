import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { OrderDetailPackage } from './OrderDetailPackage'
import { ProductPackageDetail } from './ProductPackageDetail'

@Entity()
export class ProductPackage {

    @PrimaryGeneratedColumn('uuid')
    productPackageId: string

    @Column()
    productPackageName: string

    @Column({type: 'float'})
    price: number

    @Column({type: 'bit'})
    status: string

    @OneToMany(() => ProductPackageDetail, productPackageDetail => productPackageDetail.productPackage)
    public productPackageDetail!: ProductPackageDetail[]

    @OneToMany(() => OrderDetailPackage, orderDetailPackage => orderDetailPackage.productPackage)
    orderDetailPackage: OrderDetailPackage[]

}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { ProductPackage } from "./ProductPackage";


@Entity()
export class OrderDetailPackage {

    @PrimaryGeneratedColumn('uuid')
    OrderDetailPackageId: string

    @ManyToOne(() => ProductPackage, productPackage => productPackage)
    @JoinColumn({name: 'productPackageId'})
    productPackage: ProductPackage

    @ManyToOne(() => Order, order => order)
    @JoinColumn({name: 'orderId'})
    order: Order

    @Column()
    plateNumber: number

    @Column()
    quantity: number

    @Column({type: 'float'})
    unitPrice: number

    @Column({type: 'float'})
    totalPrice: number

    @Column({type: 'bit'})
    status: string
}
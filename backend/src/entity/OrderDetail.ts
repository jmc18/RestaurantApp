import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import {Product} from './Product'
import {Order} from './Order'

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    OrderDetailId: string
    
    @ManyToOne(() => Product, product => product.orderDetailProduct, {onUpdate: "CASCADE"})
    @JoinColumn({ name: "productId" })
    public products!: Product

    @ManyToOne(() => Order, order => order.orderDetailOrder, {onUpdate: "CASCADE"})
    @JoinColumn({ name: "orderId" })
    public orders!: Order

    @Column()
    pateNumber: number

    @Column()
    quantity: number

    @Column({type: 'float'})
    totalPrice: number

    @Column({type: 'bit'})
    status: string

}
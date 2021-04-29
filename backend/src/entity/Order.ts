import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import {Table} from './Table'
import {User} from './User'
import {Plate} from './Plate'
import {OrderDetail} from './OrderDetail'
import { OrderDetailPackage } from './OrderDetailPackage'

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    orderId: string

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    orderDate: Date

    @Column({type: 'money', nullable: true})
    total: number

    @Column({type: 'money', nullable: true})
    totalPayment: number

    @ManyToOne(() => User, user => user.order)
    user: User;

    @ManyToOne(() => Table, table => table.order)
    table: Table;

    @OneToMany(() => Plate, plate => plate.orders)
     plates: Plate[]

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.orders)
    orderDetailOrder: OrderDetail[]

    @OneToMany(() => OrderDetailPackage, orderDetailPackage => orderDetailPackage.order)
    orderDetailPackage: OrderDetailPackage[]

}
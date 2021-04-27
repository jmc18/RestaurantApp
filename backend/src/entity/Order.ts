import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Table} from './Table'
import {User} from './User'

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

}
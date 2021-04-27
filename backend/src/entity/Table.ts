import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Order} from './Order'

@Entity()
export class Table {

    @PrimaryGeneratedColumn('uuid')
    tableId: string

    @Column()
    description: string

    @Column({type: 'bit'})
    status: string

    @OneToMany(() => Order, order => order.table)
     order: Order
}
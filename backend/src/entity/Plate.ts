import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Order} from './Order'

@Entity()
export class Plate {

    @PrimaryGeneratedColumn('uuid')
    plateId: string

    @Column()
    pateNumber: number

    @ManyToOne(() => Order, order => order.plates)
    orders: Order;
}
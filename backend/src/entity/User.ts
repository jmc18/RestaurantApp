import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Role } from './Role'
import {Order} from './Order'

 @Entity()
 export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string

     @ManyToOne(() => Role, role => role.users)
     role: Role

     @Column()
     firstname: string

     @Column()
     lastname: string

    @Column()
    surname: string

    @Column()
    nickname: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column({type: 'bit'})
    isActive: string

    @OneToMany(() => Order, order => order.user)
     order: Order
 }
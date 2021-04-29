import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Unique} from 'typeorm'
import { Role } from './Role'
import {Order} from './Order'

import {Length, IsNotEmpty} from 'class-validator'
import * as bcrypt from 'bcryptjs'

 @Entity()
 @Unique(["nickname, email"])
 export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string

     @ManyToOne(() => Role, role => role.users)
     role: Role

     @Column()
     @Length(4, 100)
     firstname: string

     @Column()
     @Length(4, 100)
     lastname: string

    @Column()
    @Length(4, 100)
    surname: string

    @Column()
    @Length(4, 20)
    nickname: string

    @Column()
    @Length(4, 100)
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
     order: Order[]

     hashPassword() {
         this.password = bcrypt.hashSync(this.password, 10)
     }

     checkIfUnencryptedPasswordIsValid(unencryptedPAssword: string) {
         return bcrypt.compareSync(unencryptedPAssword, this.password)
     }
 }
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { User } from './User'

 @Entity()
 export class Role {

    @PrimaryGeneratedColumn('uuid')
    idRol: string

     @Column()
     description: string

     @OneToMany(() => User, user => user.role)
     users: Role[]
 }
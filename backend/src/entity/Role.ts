import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

 @Entity()
 export class Role {

    @PrimaryGeneratedColumn('uuid')
    idRol: string

     @Column()
     description: string
 }
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    OrderDetailId: string
    
    
}
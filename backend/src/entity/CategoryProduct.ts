import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Product} from './Product'

@Entity()
export class CategoryProduct {

    @PrimaryGeneratedColumn('uuid')
    categoryId: string

    @Column()
    categoryName: string

    @OneToMany(() => Product, product => product.categoryProducts)
     products: Product
}
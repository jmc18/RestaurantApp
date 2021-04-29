import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { ProductPackage } from "./ProductPackage";


@Entity()
export class ProductPackageDetail {

    @PrimaryGeneratedColumn('uuid')
    productPackageDetailId: string

    @Column()
    quantity: number

    @ManyToOne(() => Product, product => product.productPackageDetail)
    @JoinColumn({ name: "productId" })
    product: Product

    @ManyToOne(() => ProductPackage, productPackage => productPackage.productPackageDetail)
    @JoinColumn({ name: "productPackageId" })
    productPackage: ProductPackage
}
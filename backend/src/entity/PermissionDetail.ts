import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import {Role} from './Role'
import {Permission} from './Permission'

@Entity()
export class PermissionDetail {

    @PrimaryGeneratedColumn('uuid') 
    PermisionDetailID: string;

    @ManyToOne(() => Permission, permission => permission.permissionDetail, {onUpdate: "CASCADE"})
    @JoinColumn({ name: "permissionId" })
    public permission!: Permission

    @ManyToOne(() => Role, role => role.permissionDetail, {onUpdate: "CASCADE"})
    @JoinColumn({ name: "idRol" })
    public role!: Role
}
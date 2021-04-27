import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {PermissionDetail} from './PermissionDetail'

@Entity()
export class Permission {

    @PrimaryGeneratedColumn('uuid')
    permissionId: string

    @Column()
    urlView: string

    @Column()
    viewName: string

    @OneToMany(() => PermissionDetail, permissionDetail => permissionDetail.permission)
    public permissionDetail!: PermissionDetail[];
}
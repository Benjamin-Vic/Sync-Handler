import { Permission } from "src/permission/permission.entity";
import { Rank } from "src/rank/rank.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PermissionGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
        name: "name",
        type: "varchar",
        length: 32,
    })
    name: string;

    @Column({
        nullable: true,
        unique: false,
        name: "description",
        type: "varchar",
        length: 256,
    })
    description: string;

    @ManyToMany(type => Permission, permission => permission.permissionGroups)
    permissions: Permission[];

    @ManyToMany(type => Rank, rank => rank.permissionGroups)
    ranks: Rank[];
}

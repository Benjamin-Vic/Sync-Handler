import { PermissionGroup } from "src/permission_group/permission_group.entity";
import { Rank } from "src/rank/rank.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
        name: "permission",
        type: "varchar",
        length: 128,
    })
    permission: string;

    @Column({
        nullable: true,
        unique: false,
        name: "description",
        type: "varchar",
        length: 256,
    })
    description: string;

    @ManyToMany(type => PermissionGroup, permissionGroup => permissionGroup.permissions)
    permissionGroups: PermissionGroup[];

    @ManyToMany(type => Rank, rank => rank.permissions)
    ranks: Rank[];
}
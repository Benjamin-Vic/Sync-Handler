import { Color } from "src/enum/color.enum";
import { Permission } from "src/permission/permission.entity";
import { PermissionGroup } from "src/permission_group/permission_group.entity";
import { Player } from "src/player/player.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rank {
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
        name: "prefix",
        type: "varchar",
        length: 32,
    })
    prefix: string;

    @Column({
        nullable: true,
        unique: false,
        name: "suffix",
        type: "varchar",
        length: 32,
    })
    suffix: string;

    @Column({
        nullable: true,
        unique: false,
        name: "chat_color",
        type: "enum",
        enum: Color
    })
    chatColor: Color;

    @ManyToMany(type => Permission, permission => permission.ranks)
    permissions: Permission[];

    @ManyToMany(type => PermissionGroup, permissionGroup => permissionGroup.ranks)
    permissionGroups: PermissionGroup[];

    @OneToMany(type => Player, player => player.rank)
    players: Player[];
}
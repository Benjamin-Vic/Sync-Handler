import { Color } from "src/enum/color.enum";
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
    prefix: string | null;

    @Column({
        nullable: true,
        unique: false,
        name: "suffix",
        type: "varchar",
        length: 32,
    })
    suffix: string | null;

    @Column({
        nullable: false,
        unique: false,
        name: "chat_color",
        type: "enum",
        enum: Color
    })
    chatColor: Color | null;

    @Column({
        nullable: true,
        unique: false,
        name: "permissions",
        type: "jsonb",
    })
    permissions: string[] | null;

    @OneToMany(type => Player, player => player.rank)
    players: Player[];
}
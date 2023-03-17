import { Rank } from "src/rank/rank.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
        name: "uuid",
        type: "varchar",
        length: 32,
        })
    uuid: string;

    @ManyToOne(type => Rank, rank => rank.players)
    rank: Rank;
}
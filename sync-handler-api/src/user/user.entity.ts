import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: false,
        name: "name",
        type: "varchar",
        length: 32,
    })
    name: string;

    @Column({
        nullable: false,
        unique: true,
        name: "email",
        type: "varchar",
        length: 128,
    })
    email: string;

    @Column({
        nullable: false,
        unique: false,
        name: "password",
        type: "varchar",
        length: 512,
    })
    password?: string;
}

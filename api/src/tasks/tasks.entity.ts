import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Tasks{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    subtitle:string


}
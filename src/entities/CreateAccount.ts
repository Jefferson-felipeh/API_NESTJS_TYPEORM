import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CreateAccount{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({name: 'Name', type: 'varchar', length: 50})
    name:string

    @Column({name: 'Email', type: 'varchar'})
    email:string

    @Column({name: 'Age'})
    age: string

    @Column({name: 'Password', type: 'varchar', length: 12})
    password:string

    @CreateDateColumn()
    createdOn:Date

    @UpdateDateColumn()
    updatedOn:Date

}
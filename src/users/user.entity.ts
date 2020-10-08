import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @Column()
    name: string;

    @IsEmail()
    @Column({unique:true})
    email: string;
    
    @IsNotEmpty()
    @Column()
    password: string;
}
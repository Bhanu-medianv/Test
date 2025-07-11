import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthUser{
            @PrimaryGeneratedColumn()
            userId:number
    
    
            @Column()
            name:string
    
    
            @Column()
            email:string
    
            @Column()
            password:string
}
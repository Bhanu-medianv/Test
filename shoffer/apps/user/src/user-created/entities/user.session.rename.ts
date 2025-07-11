import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSession{
    @PrimaryGeneratedColumn()
    sessionId:number

    @Column()
    userId:number
    
    @Column()
    name:string
    
    @Column()
    email:string
    
    @Column()
    password:string

}
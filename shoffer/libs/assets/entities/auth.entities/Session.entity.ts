import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session{
    @PrimaryGeneratedColumn('uuid')
    sessionId:string

    @Column()
    userId:string
    
    @Column()
    name:string
    
    @Column()
    email:string
    
    @Column()
    password:string

}
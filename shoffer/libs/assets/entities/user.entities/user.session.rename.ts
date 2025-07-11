import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSession{
    @PrimaryColumn('uuid')
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
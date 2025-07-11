import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class AuthUser{
            @PrimaryColumn('uuid')
            userId:string
    
    
            @Column()
            name:string
    
    
            @Column()
            email:string
    
            @Column()
            password:string
}
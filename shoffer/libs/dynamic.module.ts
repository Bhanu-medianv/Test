import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Module({})
export class DatabaseModule{
    static forRoot(dbname:string , entities:any[]):DynamicModule{
        const config:TypeOrmModuleOptions = {
                type:'postgres',
                    host: 'localhost',
                    port:5432,
                    username: 'postgres',
                    password: '12345',
                    database: dbname,
                    entities: entities,
                    synchronize: true,
        }
        return {
            module:DatabaseModule,
            imports :[TypeOrmModule.forRoot(config)],
            exports:[DatabaseModule]
        }
    }
    static forFeature(entities:any[]):DynamicModule{
        return {
            module:DatabaseModule,
            imports:[TypeOrmModule.forFeature(entities)],
            exports:[DatabaseModule]
        }
    }
}
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCommand } from './commands.impl';
import { Repository } from 'typeorm';
import { User } from '../../../../../libs/assets/entities/user.entities/user-created.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@CommandHandler(UserCommand)
export class CreateCommand
  implements ICommandHandler<UserCommand>, OnModuleInit
{
  private userService: any;

  constructor(
    @Inject('User') private readonly client: ClientGrpc,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<any>('UserService');
  }

  async execute(command: UserCommand): Promise<any> {
    const new_uuid = crypto.randomUUID()
    const newUser = this.userRepository.create({userId:new_uuid , ...command.createUserCreatedDto});
    await this.userRepository.save(newUser);
    console.log(newUser.userId , newUser.name)
    await lastValueFrom(
      this.userService.CreateUser({
        userId:newUser.userId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }),
    );

    return {
        userId:newUser.userId,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
  }
}

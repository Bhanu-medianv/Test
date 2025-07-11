import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "../../../../../libs/assets/entities/auth.entities/Authuser.entity";
import { Repository } from "typeorm";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Session } from "../../../../../libs/assets/entities/auth.entities/Session.entity";
import { ClientKafka } from "@nestjs/microservices";
import { LoginUserImpl } from "./loginuser.impl";

@CommandHandler(LoginUserImpl)
export class LoginUser implements ICommandHandler<LoginUserImpl> {
  constructor(
    @InjectRepository(AuthUser) private readonly authUserRepo: Repository<AuthUser>,
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>,
    @Inject('SESSION') private readonly kafkaClient: ClientKafka
  ) {}
  
  async execute(command: LoginUserImpl): Promise<any> {
    const { email, password } = command.loginInfo;

    const userFound = await this.authUserRepo.findOne({ where: { email:email} });
      console.log("session is sent ")


    if (!userFound) {
      throw new NotFoundException("User not found");
    }
      console.log("userFound is sent ")


    if (userFound.password !== password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const existingSession = await this.sessionRepo.findOne({ where: { email } });

    if (!existingSession) {
      const newSession = this.sessionRepo.create({
        userId: userFound.userId,
        name: userFound.name,
        email: userFound.email,
        password: userFound.password,
      });


 
      await this.sessionRepo.save(newSession);
      
      this.kafkaClient.emit('session-creates', JSON.stringify(newSession));
      return {
        message: "Session created and sent to Kafka successfully",
        session: newSession,
      };
    }
    return {
      message: "User already has a session",
    };
  }
  
}

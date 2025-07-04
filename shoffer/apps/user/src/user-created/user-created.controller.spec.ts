import { Test, TestingModule } from '@nestjs/testing';
import { UserCreatedController } from './user-created.controller';
import { UserCreatedService } from './user-created.service';

describe('UserCreatedController', () => {
  let controller: UserCreatedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreatedController],
      providers: [UserCreatedService],
    }).compile();

    controller = module.get<UserCreatedController>(UserCreatedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

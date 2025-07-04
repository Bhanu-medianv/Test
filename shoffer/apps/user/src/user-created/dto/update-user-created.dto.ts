import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCreatedDto } from './create-user-created.dto';

export class UpdateUserCreatedDto extends PartialType(CreateUserCreatedDto) {}

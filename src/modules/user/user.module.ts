import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UserController } from './controllers/user.controller';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUsersUseCase } from './use-cases/get-users.use-case';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, CreateUserUseCase, GetUserUseCase, GetUsersUseCase, UpdateUserUseCase, DeleteUserUseCase],
  controllers: [UserController],
})
export class UserModule {}

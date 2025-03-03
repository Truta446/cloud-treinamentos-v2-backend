import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, CreateUserUseCase, GetUserUseCase],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}

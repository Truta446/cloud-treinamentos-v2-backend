/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { GetUserFilterDto } from '../dtos/inputs/get-user-filter.dto';
import { GetUsersFilterDto } from '../dtos/inputs/get-users-filter.dto';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  @Inject(PrismaService)
  private readonly $db: PrismaService = new PrismaService();

  public async getUser(data: GetUserFilterDto): Promise<UserEntity | null> {
    const response: UserEntity | null = await this.$db.user.findFirst({
      where: {
        ...data,
      },
    });
    return response;
  }

  public async getUsers(data: GetUsersFilterDto): Promise<UserEntity[]> {
    const response: UserEntity[] = await this.$db.user.findMany({
      where: {
        ...data,
      },
    });
    return response;
  }

  public async createUser(data: CreateUserDto): Promise<UserEntity> {
    const response: UserEntity = await this.$db.user.create({
      data: {
        ...data,
      },
    });
    return response;
  }

  public async updateUser(data: UpdateUserDto): Promise<UserEntity> {
    const response: UserEntity = await this.$db.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    return response;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.$db.user.delete({
      where: {
        id,
      },
    });
  }
}

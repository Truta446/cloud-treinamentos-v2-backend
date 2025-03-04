import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from '../../../../libs/prisma/prisma.service';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  @Inject(PrismaService) private readonly $db: PrismaService;

  public async getUser(id: string): Promise<UserEntity | null> {
    return await this.$db.user.findUnique({
      where: {
        id,
      },
      include: { address: true },
    });
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.$db.user.findMany({ include: { address: true } });
  }

  public async createUser(data: CreateUserDto): Promise<UserEntity> {
    return await this.$db.user.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        address: data.address
          ? {
              create: {
                street: data.address.street,
                number: data.address.number,
                complement: data.address.complement,
                neighborhood: data.address.neighborhood,
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                postalCode: data.address.postalCode,
              },
            }
          : undefined,
      },
      include: { address: true },
    });
  }

  public async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    const response: UserEntity = await this.$db.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
      },
      include: { address: true },
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

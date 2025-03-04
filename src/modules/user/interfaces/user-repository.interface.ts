import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';
import { UserEntity } from '../entity/user.entity';

export interface IUserRepository {
  getUser(id: string): Promise<UserEntity | null>;
  getUsers(): Promise<UserEntity[]>;
  createUser(data: CreateUserDto): Promise<UserEntity>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserEntity>;
  deleteUser(id: string): Promise<void>;
}

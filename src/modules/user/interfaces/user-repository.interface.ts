import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { GetUserFilterDto } from '../dtos/inputs/get-user-filter.dto';
import { GetUsersFilterDto } from '../dtos/inputs/get-users-filter.dto';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';
import { UserEntity } from '../entity/user.entity';

export interface IUserRepository {
  getUser(data: GetUserFilterDto): Promise<UserEntity | null>;
  getUsers(data: GetUsersFilterDto): Promise<UserEntity[]>;
  createUser(data: CreateUserDto): Promise<UserEntity>;
  updateUser(data: UpdateUserDto): Promise<UserEntity>;
  deleteUser(id: string): Promise<void>;
}

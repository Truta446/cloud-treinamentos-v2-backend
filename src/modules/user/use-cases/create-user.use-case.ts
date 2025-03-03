import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(data: CreateUserDto): Promise<UserResponseDto> {
    try {
      const newUser = await this.userRepository.createUser(data);
      return new UserResponseDto(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}

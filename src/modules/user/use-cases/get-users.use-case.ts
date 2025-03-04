import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUsersUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.getUsers();

      return users.map((user) => new UserResponseDto(user));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw error;
    }
  }
}

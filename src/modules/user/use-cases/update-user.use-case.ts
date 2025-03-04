import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  @Inject(UserRepository) private readonly userRepository: UserRepository;

  public async execute(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const newUser = await this.userRepository.updateUser(id, data);

      return new UserResponseDto(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}

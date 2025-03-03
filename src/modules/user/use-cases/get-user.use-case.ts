import { Inject, Injectable } from '@nestjs/common';
import { GetUserFilterDto } from '../dtos/inputs/get-user-filter.dto';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(
    data: GetUserFilterDto,
  ): Promise<UserResponseDto | undefined> {
    try {
      const user = await this.userRepository.getUser(data);

      if (user) {
        return new UserResponseDto(user);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw error;
    }
  }
}

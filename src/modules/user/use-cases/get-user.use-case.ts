import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  public async execute(id: string): Promise<UserResponseDto | undefined> {
    try {
      const user = await this.userRepository.getUser(id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return new UserResponseDto(user);
    } catch (error) {
      throw error;
    }
  }
}

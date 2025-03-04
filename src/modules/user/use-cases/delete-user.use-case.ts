import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  @Inject(UserRepository) private readonly userRepository: UserRepository;

  public async execute(id: string): Promise<boolean> {
    try {
      await this.userRepository.deleteUser(id);

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}

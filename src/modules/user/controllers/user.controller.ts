import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetUserUseCase } from '../use-cases/get-user.use-case';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import { CreateUserDto } from '../dtos/inputs/create-user.dto';
import { GetUsersFilterDto } from '../dtos/inputs/get-users-filter.dto';

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  @Inject(CreateUserUseCase) private readonly $create: CreateUserUseCase;
  @Inject(GetUserUseCase) private readonly $get: GetUserUseCase;

  @Get(':id')
  public getUser(
    @Body() data: GetUsersFilterDto,
  ): Promise<UserResponseDto | undefined> {
    return this.$get.execute(data);
  }

  @Post()
  public createUser(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.$create.execute(data);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetUserUseCase } from '../use-cases/get-user.use-case';
import { UserResponseDto } from '../dtos/outputs/user-response.dto';
import {
  CreateUserDto,
  CreateUserSchema,
} from '../dtos/inputs/create-user.dto';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import {
  UpdateUserDto,
  UpdateUserSchema,
} from '../dtos/inputs/update-user.dto';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  @Inject(GetUserUseCase) private readonly $get: GetUserUseCase;
  @Inject(GetUsersUseCase) private readonly $list: GetUsersUseCase;
  @Inject(CreateUserUseCase) private readonly $create: CreateUserUseCase;
  @Inject(UpdateUserUseCase) private readonly $update: UpdateUserUseCase;
  @Inject(DeleteUserUseCase) private readonly $delete: DeleteUserUseCase;

  @Get(':id')
  public getUser(
    @Param('id') id: string,
  ): Promise<UserResponseDto | undefined> {
    return this.$get.execute(id);
  }

  @Get()
  public getUsers(): Promise<UserResponseDto[] | undefined> {
    return this.$list.execute();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  public createUser(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.$create.execute(data);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  public updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.$update.execute(id, data);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.$delete.execute(id);
  }
}

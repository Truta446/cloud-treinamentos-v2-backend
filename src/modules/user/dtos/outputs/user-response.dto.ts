import { UserEntity } from '../../entity/user.entity';
import { AddressResponseDto } from './address-response.dto';

export class UserResponseDto {
  public id: string;
  public name: string;
  public cpf: string;
  public email: string;
  public phone: string;
  public createdAt: Date;
  public updatedAt?: Date | null;
  public address?: AddressResponseDto[];

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.cpf = entity.cpf;
    this.email = entity.email;
    this.phone = entity.phone;
    this.address = entity.address;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}

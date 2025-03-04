import { AddressEntity } from './address.entity';

export class UserEntity {
  public id: string;
  public name: string;
  public cpf: string;
  public email: string;
  public phone: string;
  public createdAt: Date;
  public updatedAt?: Date | null;
  public address?: AddressEntity[];
}

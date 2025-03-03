import { AddressEntity } from '../../entity/address.entity';

export class AddressResponseDto {
  public street: string;
  public number: string;
  public city: string;
  public state: string;
  public country: string;
  public complement?: string | null;
  public neighborhood?: string | null;

  constructor(entity: AddressEntity) {
    this.street = entity.street;
    this.number = entity.number;
    this.city = entity.city;
    this.state = entity.state;
    this.country = entity.country;
    this.complement = entity.complement;
    this.neighborhood = entity.neighborhood;
  }
}

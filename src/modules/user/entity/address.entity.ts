export class AddressEntity {
  public id: string;
  public street: string;
  public number: string;
  public city: string;
  public state: string;
  public country: string;
  public complement?: string | null;
  public neighborhood?: string | null;
  public createdAt: Date;
  public updatedAt?: Date | null;
  public deletedAt?: Date | null;

  public userId: string;
}

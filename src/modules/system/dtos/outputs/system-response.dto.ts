export class SystemResponseDto {
  public id: string;
  public name: string;
  public description?: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(entity: any) {
    this.id = entity.id;
    this.name = entity.companyName;
    this.description = entity.description;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt ?? new Date();
  }
}

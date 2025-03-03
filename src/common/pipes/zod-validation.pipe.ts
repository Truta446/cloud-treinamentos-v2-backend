import { PipeTransform, ArgumentMetadata, BadRequestException, Inject } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  @Inject(ZodSchema) private readonly schema: ZodSchema;

  public transform(value: unknown, metadata: ArgumentMetadata): any {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}

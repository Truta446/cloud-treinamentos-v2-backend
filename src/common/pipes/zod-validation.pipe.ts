import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  public transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'body') {
      return value;
    }

    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      throw new BadRequestException({
        statusCode: 400,
        error: 'Validation Failed',
        messages: formattedErrors,
      });
    }

    return result.data;
  }
}

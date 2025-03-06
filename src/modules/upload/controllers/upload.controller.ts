import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { UploadImageUseCase } from '../use-cases/upload-image.use-case';
import { UploadImageDto, UploadImageSchema } from '../dtos/inputs/upload-image.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller({
  version: '1',
  path: 'upload',
})
export class UploadController {
  @Inject(UploadImageUseCase) private readonly $uploadImage: UploadImageUseCase;

  @Post()
  @UsePipes(new ZodValidationPipe(UploadImageSchema))
  public uploadImage(@Body() body: UploadImageDto): Promise<boolean> {
    return this.$uploadImage.execute(body);
  }
}

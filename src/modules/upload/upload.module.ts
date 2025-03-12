import { Module } from '@nestjs/common';
import { S3Module } from 'libs/s3/s3.module';
import { UploadImageUseCase } from './use-cases/upload-image.use-case';
import { UploadController } from './controllers/upload.controller';
import { GetImageUseCase } from './use-cases/get-image.use-case';

@Module({
  imports: [S3Module],
  providers: [UploadImageUseCase, GetImageUseCase],
  controllers: [UploadController],
})
export class UploadModule {}

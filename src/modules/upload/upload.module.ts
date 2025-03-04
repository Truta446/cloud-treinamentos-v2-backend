import { Module } from '@nestjs/common';
import { S3Module } from 'libs/s3/s3.module';
import { UploadImageUseCase } from './use-cases/upload-image.use-case';
import { UploadController } from './controllers/upload.controller';

@Module({
  imports: [S3Module],
  providers: [UploadImageUseCase],
  controllers: [UploadController],
})
export class UploadModule {}

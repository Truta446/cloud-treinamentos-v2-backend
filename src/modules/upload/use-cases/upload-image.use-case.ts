import { Inject, Injectable } from '@nestjs/common';
import { S3Service } from 'libs/s3/s3.service';

@Injectable()
export class UploadImageUseCase {
  @Inject(S3Service) private readonly $s3: S3Service;

  public async execute(data: any): Promise<boolean> {
    try {
      await this.$s3.uploadFile({
        path: 'logo',
        contentType: data.file.split(';')[0].split(':')[1],
        file: Buffer.from(data.file.split(',')[1], 'base64'),
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}

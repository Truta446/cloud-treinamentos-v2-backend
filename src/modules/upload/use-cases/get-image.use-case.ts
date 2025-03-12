import { Injectable } from '@nestjs/common';

@Injectable()
export class GetImageUseCase {
  public async execute(): Promise<any> {
    try {
      return { image: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_AWS_REGION}.amazonaws.com/logo` };
    } catch (error) {
      throw error;
    }
  }
}

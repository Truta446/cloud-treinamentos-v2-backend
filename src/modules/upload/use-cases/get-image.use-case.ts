import { Injectable } from '@nestjs/common';

@Injectable()
export class GetImageUseCase {
  public execute(): any {
    return { image: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_AWS_REGION}.amazonaws.com/logo` };
  }
}

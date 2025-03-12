import { PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucketName: string = process.env.S3_BUCKET_NAME!;

  constructor() {
    this.client = new S3Client({
      region: process.env.S3_AWS_REGION,
    });
  }

  public async uploadFile(data: { file: Buffer; path: string; contentType: string }): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: data.path,
      Body: data.file,
      ContentType: data.contentType,
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error(error);
    }
  }
}

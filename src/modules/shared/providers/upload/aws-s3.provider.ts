import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
config();

const {
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

@Injectable()
export class AWSS3Provider {
  async uploadImage(files: any): Promise<string[]> {
    try {
      return await Promise.all(files.flatMap( async(file) => {
        const s3 = new S3({
          apiVersion: '2006-03-01',
          region: AWS_REGION,
          credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
          },
        });
        const bucketName = AWS_BUCKET_NAME;
        const objectKey = `images/${uuidv4()}-${file.originalname}`;
        const uploadParams: AWS.S3.PutObjectRequest = {
          Bucket: bucketName,
          Key: objectKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
  
        const data = await s3.upload(uploadParams).promise();
  
        return data.Location
      }))
    } catch (error) {
      throw new InternalServerErrorException('failed to upload file');
    }
  }
}

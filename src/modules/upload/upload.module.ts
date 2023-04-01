import { Module } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  controllers: [UploadController],
  providers: [ImageService],
})
export class UploadModule {}

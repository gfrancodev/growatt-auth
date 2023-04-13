import { MulterModuleOptions } from '@nestjs/platform-express';

export interface IUpload {
  uploadImage(file: Express.Multer.File[]): Promise<string[]>;
  getMulterOptions(): MulterModuleOptions;
}

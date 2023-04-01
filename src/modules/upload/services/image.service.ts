import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUpload } from 'src/modules/shared/interfaces/iupload';

@Injectable()
export class ImageService {
  protected logger = new Logger(ImageService.name)
  constructor(
    @Inject('Upload')
    private readonly upload: IUpload,
  ) {}

  async execute(files: Express.Multer.File[]) {
    const images = await this.upload.uploadImage(files)
    this.logger.debug("IMAGES UPLOADED", images)
    return { images };
  }

}

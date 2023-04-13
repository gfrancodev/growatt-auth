import { Inject, Injectable, Logger } from '@nestjs/common';
import { IGallery } from 'src/modules/shared/interfaces/igallery';
import { IUpload } from 'src/modules/shared/interfaces/iupload';

@Injectable()
export class ImageService {
  protected logger = new Logger(ImageService.name)
  constructor(
    @Inject('Upload')
    private readonly upload: IUpload,
    @Inject('Gallery')
    private readonly gallery: IGallery
  ) {}

  async execute(user_id: string, files: Express.Multer.File[]) {
    const images = await this.upload.uploadImage(files)
    await Promise.all(images.flatMap(async (image) => {
      await this.gallery.save({ user_id, image_url: image })
    }))
    return { images };
  }

}

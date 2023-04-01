import {
  Controller,
  Request,
  Post,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('v1/upload')
export class UploadController {
  constructor(private readonly imageService: ImageService) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadImage(
    @Request() req,
    @UploadedFiles( new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'image/*' }),
      ]
    })) files: Express.Multer.File[],
  ): Promise<any> {
    console.log(req, files)
    return await this.imageService.execute(files)
  }
}

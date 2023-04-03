import {
  Controller,
  Request,
  Post,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { JwtGuard } from 'src/modules/shared/guards/jwt.guard';
import { RolesGuard } from 'src/modules/shared/guards/roles.guard';
import { Role } from 'src/modules/shared/enums/role.enum';

@ApiTags('Upload')
@Controller('v1/upload')
export class UploadController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
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
    return await this.imageService.execute(files)
  }
}

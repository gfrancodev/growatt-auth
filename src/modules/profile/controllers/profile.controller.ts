import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { CreateService } from '../services/create.service';
import { DeleteService } from '../services/delete.service';
import { FindOneService } from '../services/findone.service';
import { FindAllService } from '../services/findall.service';
import { UpdateService } from '../services/update.service';
import { CreateProfileDTO } from '../dtos/create.dto';
import { UpdateProfileDTO } from '../dtos/update.dto';
import { FindAllProfileDTO } from '../dtos/findall.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/shared/guards/jwt.guard';


@ApiBearerAuth()
@ApiTags('Perfil')
@Controller('v1/profile')
export class ProfileController {
  constructor(
    private readonly createService: CreateService,
    private readonly findAllService: FindAllService,
    private readonly findOneService: FindOneService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() body: CreateProfileDTO) {
    return await this.createService.execute({ user_id: req.user.user_id, ...body });
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Request() req, @Query('page') page: FindAllProfileDTO) {
    return await this.findAllService.execute(Number(page));
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneService.execute({ user_id: id });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProfileDTO) {
    return await this.updateService.execute({ user_id: id, ...body });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteService.execute({ user_id: id });
  }
}

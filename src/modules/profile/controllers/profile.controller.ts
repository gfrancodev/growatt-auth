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
import { RolesGuard } from 'src/modules/shared/guards/roles.guard';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { Role } from 'src/modules/shared/enums/role.enum';


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

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Request() req, @Body() body: CreateProfileDTO) {
    return await this.createService.execute({ user_id: req.user.user_id, ...body });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll(@Request() req, @Query('page') page: FindAllProfileDTO,  @Query('filter') filter?: string) {
    return await this.findAllService.execute(Number(page), filter);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/me')
  async findProfile(@Request() req: any) {
    return await this.findOneService.execute({ user_id: req.user.id });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':user_id')
  async findOne(@Param('user_id') id: string) {
    return await this.findOneService.execute({ user_id: id });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':user_id')
  async update(@Param('user_id') id: string, @Body() body: UpdateProfileDTO) {
    return await this.updateService.execute({ user_id: id, ...body });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':user_id')
  async delete(@Param('user_id') id: string) {
    return await this.deleteService.execute({ user_id: id });
  }
}

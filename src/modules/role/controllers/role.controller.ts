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
} from '@nestjs/common';
import { CreateService } from '../services/create.service';
import { DeleteService } from '../services/delete.service';
import { FindOneService } from '../services/findone.service';
import { FindAllService } from '../services/findall.service';
import { UpdateService } from '../services/update.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { Role } from 'src/modules/shared/enums/role.enum';
import { JwtGuard } from 'src/modules/shared/guards/jwt.guard';
import { CreateRoleDTO } from '../dtos/create.dto';


@ApiBearerAuth()
@ApiTags('Role')
@Controller('v1/role')
export class RoleController {
  constructor(
    private readonly createService: CreateService,
    private readonly findAllService: FindAllService,
    private readonly findOneService: FindOneService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @UseGuards(JwtGuard)
  //@Roles(Role.Admin)
  @Post()
  async create(@Body() body: CreateRoleDTO) {
    return await this.createService.execute(body);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Query('page') page: string) {
    return await this.findAllService.execute(Number(page));
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneService.execute({ user_id: id });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.updateService.execute({ user_id: id, ...body });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteService.execute({ user_id: id });
  }
}

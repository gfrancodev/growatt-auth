import { Module } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { DeleteService } from './services/delete.service';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';
import { UpdateService } from './services/update.service';
import { RoleController } from './controllers/role.controller';

@Module({
  controllers: [RoleController],
  providers: [
    CreateService,
    DeleteService,
    FindAllService,
    FindOneService,
    UpdateService,
  ],
})
export class RoleModule {}

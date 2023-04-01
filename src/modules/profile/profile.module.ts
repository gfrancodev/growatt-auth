import { Module } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { DeleteService } from './services/delete.service';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';
import { UpdateService } from './services/update.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    CreateService,
    DeleteService,
    FindAllService,
    FindOneService,
    UpdateService,
  ],
})
export class ProfileModule {}

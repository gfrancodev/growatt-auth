import { Inject, Injectable } from '@nestjs/common';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';

@Injectable()
export class CreateService {
  constructor(
    @Inject('Profile')
    private readonly profile: IProfile,
  ) {}

  async execute(data) {
    return await this.profile.createProfile(data);
  }
}

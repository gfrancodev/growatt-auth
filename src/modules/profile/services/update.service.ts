import { Inject, Injectable } from '@nestjs/common';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';

@Injectable()
export class UpdateService {
  constructor(
    @Inject('Profile')
    private readonly profile: IProfile,
  ) {}

  async execute({ user_id, ...rest }) {
    return await this.profile.updateProfile(user_id, rest);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';

@Injectable()
export class DeleteService {
  constructor(
    @Inject('Profile')
    private readonly profile: IProfile,
  ) {}

  async execute({ user_id }) {
    return await this.profile.deleteProfile(user_id);
  }
}

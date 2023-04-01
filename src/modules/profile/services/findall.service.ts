import { Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';

@Injectable()
export class FindAllService {
  constructor(
    @Inject('Profile')
    private readonly profile: IProfile,
    @Inject('Auth')
    private readonly auth: IAuth,
  ) {}

  async execute(page) {
    const user = await this.auth.findAllAuth(page ?? 1) as any;
    console.log(user)
    const data = await Promise.all(
      user.flatMap(async (item) => {
        delete item.password;
        delete item.passwordExpires;
        delete item.passwordResetToken;
        delete item.createdAt;
        delete item.updatedAt;

        const profile = await this.profile.findOneProfile(item.user_id);

        delete profile.id;
        delete profile.createdAt;
        delete profile.updatedAt;
        return {
          ...item,
          ...profile,
        };
      }),
    );
    return { total: user.length, data };
  }
}

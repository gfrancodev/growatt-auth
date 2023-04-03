import { Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';
import { IRoles } from 'src/modules/shared/interfaces/iroles';

@Injectable()
export class FindOneService {
  constructor(
    @Inject('Profile')
    private readonly profile: IProfile,
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Role')
    private readonly role: IRoles,
  ) {}

  async execute({ user_id }) {
    const user: any = await this.auth.findById(user_id);

    delete user.password;
    delete user.passowrdExpires;
    delete user.passwordResetToken;
    delete user.createdAt;
    delete user.updatedAt;

    user.roles = await Promise.all((await this.role.findAllRolesByUserId(user_id)).flatMap(async({ name })  => { return name}))

    const profile = await this.profile.findOneProfile(user.id);

    delete profile.id;
    delete profile.createdAt;
    delete profile.updatedAt;

    return { user, profile };
  }
}

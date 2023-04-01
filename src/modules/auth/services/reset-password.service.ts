import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Token')
    private readonly token: IToken,
  ) {}

  async execute({ email, password, token }: ResetPasswordDTO) {
    const user = await this.auth.findByEmail(email);

    if (!(await this.token.findOneToken(user.id, token))) {
      throw new ForbiddenException('Token not exists');
    }

    const encryptPassword = hashSync(password, genSaltSync(12));

    await this.auth.updateAuth(user.id, { password: encryptPassword });

    return { success: 'Save and register password' };
  }
}

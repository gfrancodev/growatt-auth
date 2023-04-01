import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ResetEmailDTO } from '../dtos/reset-email.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';

@Injectable()
export class ResetEmailService {
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Token')
    private readonly token: IToken,
  ) {}

  async execute({ email, token }: ResetEmailDTO) {
    const user = await this.auth.findByEmail(email);

    if (!(await this.token.findOneToken(user.id, token))) {
      throw new ForbiddenException('Token not exists');
    }

    await this.auth.updateAuth(user.id, { email });

    return { success: 'Save and register password' };
  }
}

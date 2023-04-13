import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class ResetPasswordService {
  protected logger = new Logger(ResetPasswordService.name)

  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Token')
    private readonly token: IToken,
  ) {}

  async execute({ email, password, token }: ResetPasswordDTO) {
    const user = await this.auth.findByEmail(email);
    this.logger.debug("[USER]", user)

    const exists_token = await this.token.findOneToken(user.id, token)
    this.logger.debug("[TOKEN_EXISTS]", exists_token)

    if (!exists_token) {
      this.logger.error("[TOKEN_NOT_EXISTS]")
      throw new ForbiddenException('Token not exists');
    }

    const encryptPassword = hashSync(password, genSaltSync(12));
    this.logger.debug("[NEW_PASSWORD_ENCRYPT]", encryptPassword)

    await this.auth.updateAuth(user.id, { password: encryptPassword });
    this.logger.debug("[UPDATE_PASSWORD]", { user_id: user.id, password: encryptPassword })

    return { success: 'Save and register password' };
  }
}

import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ResetEmailDTO } from '../dtos/reset-email.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';

@Injectable()
export class ResetEmailService {
  protected logger = new Logger(ResetEmailService.name)
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Token')
    private readonly token: IToken,
  ) {}

  async execute({ email, token }: ResetEmailDTO) {
    const user = await this.auth.findByEmail(email);
    this.logger.debug("[USER]", user)

    const exists_token = await this.token.findOneToken(user.id, token)
    this.logger.debug("[TOKEN_EXISTS]", exists_token)    

    if (!exists_token) {
      this.logger.error("[TOKEN_NOT_EXISTS]")    
      throw new ForbiddenException('Token not exists');
    }

    await this.auth.updateAuth(user.id, { email });

    return { success: 'Save and register password' };
  }
}

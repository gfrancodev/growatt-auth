import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { ConfirmEmailDTO } from '../dtos/confirm-email.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';

@Injectable()
export class ConfirmEmailService {
  protected logger = new Logger(ConfirmEmailService.name)
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Code')
    private readonly code: ICode,
    @Inject('GenerateCode')
    private readonly generateCode: IGenerateCode,
    @Inject('Token')
    private readonly token: IToken,
  ) {}

  async execute({ email, code }: ConfirmEmailDTO) {
    const user = await this.auth.findByEmail(email);
    this.logger.debug("[USER]", user)

    if (!user) {
      this.logger.error("[USER_NOT_EXISTS]", user)
      throw new ForbiddenException('E-mail not exists');
    }

    const verifyCode = await this.code.findOneCodeByUserId(user.id, "email_verify", code);
    this.logger.debug("[VERIFY_CODE]", verifyCode)

    if (!verifyCode) {
      this.logger.error("[CODE_NVALID]", verifyCode)
      throw new ForbiddenException('Code not is valid');
    }

    await this.code.updateStatusCode(user.id, "email_verify", code, true);
    this.logger.debug("[UPDATE_CODE]", verifyCode)

    await this.auth.updateAuth(user.id, { emailVerify: true })

    return { msg: "Verified e-mail" };
  }
}

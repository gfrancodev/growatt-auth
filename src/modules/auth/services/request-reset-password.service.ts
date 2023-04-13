import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { RequestResetPasswordDTO } from '../dtos/request-reset-password';
import { IMail } from 'src/modules/shared/interfaces/imail';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';
import { resolve } from 'path';
import { config } from 'dotenv';
config();

const { MAIL_NAME } = process.env;

@Injectable()
export class RequestResetPasswordService {
  protected logger = new Logger(RequestResetPasswordService.name)
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Mail')
    private readonly mail: IMail,
    @Inject('GenerateCode')
    private readonly generateCode: IGenerateCode,
    @Inject('Code')
    private readonly code: ICode,
  ) {}

  async execute({ email }: RequestResetPasswordDTO) {
    const user = await this.auth.findByEmail(email);
    this.logger.debug("[USER]", user)

    const sixCode = this.generateCode.six();
    this.logger.debug("[SIXCODE]", sixCode)

    await this.code.createCode({
      user_id: user.id,
      type: 'password_reset',
      code: sixCode,
    });

    this.mail.send({
      to: process.env.MAIL_TO,
      from: user.email,
      subject: `🧑‍🎓 ${MAIL_NAME} - Seu código de confirmação é ${sixCode}`,
      template: resolve('shared/templates') + '/code-reset-password',
      html: `<h1>Seu código é ${sixCode}!</h1>`,
    });
    return { msg: 'Requested confirm e-mail with success' };
  }
}

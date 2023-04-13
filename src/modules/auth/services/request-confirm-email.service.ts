import { Inject, Injectable, Logger } from '@nestjs/common';
import { resolve } from 'path';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';
import { IMail } from 'src/modules/shared/interfaces/imail';
import { config } from 'dotenv';
config();

const { MAIL_NAME } = process.env;

@Injectable()
export class RequestConfirmEmailService {
  protected logger = new Logger(RequestConfirmEmailService.name)
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

  async execute(id: string) {
 
    const user = await this.auth.findById(id);
    this.logger.debug("[USER]", user)

    const sixCode = this.generateCode.six();
    this.logger.debug("[SIX_CODE]", user)

    await this.code.createCode({
      user_id: id,
      type: 'email_verify',
      code: sixCode,
    });
    this.logger.debug("[REGISTER_SIX_CODE]", user)

    this.mail.send({
      to: process.env.MAIL_TO,
      from: user.email,
      subject: `🧑‍🎓 ${MAIL_NAME} - Seu código de confirmação é ${sixCode}`,
      template: resolve('shared/templates') + '/code-confirm-email',
      html: `<h1>Seu código é ${sixCode}!</h1>`,
    });
    this.logger.debug("[SEND_MAIL_CONFIRM_SIX_CODE]", user)
    return { msg: 'Requested confirm e-mail with success' };
  }
}

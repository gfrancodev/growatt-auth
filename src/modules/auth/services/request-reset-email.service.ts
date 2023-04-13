import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { RequesResetEmailDTO } from '../dtos/request-reset-email.dto';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';
import { IMail } from 'src/modules/shared/interfaces/imail';
import { resolve } from 'path';
import { config } from 'dotenv';
config();

const { MAIL_NAME } = process.env;

@Injectable()
export class RequestResetEmailService {
  protected logger = new Logger(RequestResetEmailService.name)
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

  async execute({ email }: RequesResetEmailDTO) {
    this.logger.debug("[EMAIL]", email)
    const user = await this.auth.findByEmail(email);

    this.logger.debug("[USER]", user)
    const sixCode = this.generateCode.six();

    this.logger.debug("[CODE]", sixCode)
  
    this.logger.debug("[CODE_PAYLOAD]", {
      user_id: user.id,
      type: 'email_reset',
      code: sixCode,
    })
    
    await this.code.createCode({
      user_id: user.id,
      type: 'email_reset',
      code: sixCode,
    });

    this.mail.send({
      to: process.env.MAIL_TO,
      from: email,
      subject: `🧑‍🎓 ${MAIL_NAME}- Seu código de confirmação é ${sixCode}`,
      //template: resolve('shared/templates') + '/code-confirm-email',
      html: `<h1>Seu código é ${sixCode}!</h1>`,
    });
    return { msg: 'Requested confirm e-mail with success' };
  }
}

import { Inject, Injectable } from '@nestjs/common';
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

    const sixCode = this.generateCode.six();

    await this.code.createCode({
      id: user.id,
      type: 'email_verify',
      code: sixCode,
    });

    this.mail.send({
      to: process.env.MAIL_TO,
      from: user.email,
      subject: `🧑‍🎓 ${MAIL_NAME} - Seu código de confirmação é ${sixCode}`,
      template: resolve('shared/templates') + '/code-confirm-email',
      html: `<h1>Seu código é ${sixCode}!</h1>`,
    });
    return { msg: 'Requested confirm e-mail with success' };
  }
}

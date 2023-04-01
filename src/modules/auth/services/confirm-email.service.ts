import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { ConfirmEmailDTO } from '../dtos/confirm-email.dto';
import { IToken } from 'src/modules/shared/interfaces/itoken';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';

@Injectable()
export class ConfirmEmailService {
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
    if (!user) {
      throw new ForbiddenException('E-mail not exists');
    }
    const verifyCode = await this.code.findOneCodeByUserId(user.id, code);

    if (!verifyCode) throw new ForbiddenException('Code not is valid');

    await this.code.updateStatusCode(user.id, code, true);

    const opactoken = this.generateCode.opac();

    await this.token.createToken({ id: user.id, value: opactoken });

    return { token: opactoken };
  }
}

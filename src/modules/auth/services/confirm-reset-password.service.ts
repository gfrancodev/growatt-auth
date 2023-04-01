import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ConfirmResetPasswordDTO } from '../dtos/confirm-reset-password.dto';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';
import { IToken } from 'src/modules/shared/interfaces/itoken';

@Injectable()
export class ConfirmResetPasswordService {
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

  async execute({ email, code }: ConfirmResetPasswordDTO) {
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

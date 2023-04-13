import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { ConfirmResetPasswordDTO } from '../dtos/confirm-reset-password.dto';
import { ICode } from 'src/modules/shared/interfaces/icode';
import { IGenerateCode } from 'src/modules/shared/interfaces/igenerate-code';
import { IToken } from 'src/modules/shared/interfaces/itoken';

@Injectable()
export class ConfirmResetPasswordService {
  protected logger = new Logger(ConfirmResetPasswordService.name)
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
    this.logger.debug(["USER"], user)

    if (!user) {
      this.logger.error("[USER_NOT_EXISTS]")
      throw new ForbiddenException('E-mail not exists');
    }

    const verifyCode = await this.code.findOneCodeByUserId(user.id, "password_reset", code);
    this.logger.debug("[CODE_VERIFY]", verifyCode)

    if (!verifyCode) {
      this.logger.error("[CODE_INVALID]")
      throw new ForbiddenException('Code not is valid');
    }

    await this.code.updateStatusCode(user.id, "password_reset", code, true);
    this.logger.debug("[UPDATE_STATUS_CODE]", { user_id: user.id, type: "password_reset", status: true });

    const opactoken = this.generateCode.opac();
    this.logger.debug("[GENERATE_OPAC_TOKEN]", opactoken)

    await this.token.createToken({ user_id: user.id, value: opactoken });
    this.logger.debug("[CREATE_TOKEN]", { user_id: user.id, token: opactoken })

    return { token: opactoken };
  }
}

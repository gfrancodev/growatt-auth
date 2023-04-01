import { Inject, Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { RegisterDTO } from '../dtos/reigster.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { IMail } from 'src/modules/shared/interfaces/imail';
import { config } from 'dotenv';
import { IProfile } from 'src/modules/shared/interfaces/iprofile';
config();

const { MAIL_NAME } = process.env;

@Injectable()
export class RegisterService {
  protected logger = new Logger(RegisterService.name);

  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Profile')
    private readonly profile: IProfile,
    @Inject('Mail')
    private readonly mail: IMail,
  ) {}

  async execute(data: RegisterDTO) {
    const { email, username, password } = data;

    this.logger.debug('[INPUT]', { email, username, password });

    const user = await this.auth.findOneAuth({ email, username });

    this.logger.debug('[USER_NOT_EXISTS]', user);

    if (user) {
      this.logger.error('[ERROR] E-mail or Username already exists.');
      throw new ForbiddenException('E-mail or Username already exists.');
    }

    const encryptPassword = hashSync(password, genSaltSync(12));

    this.logger.debug('[ENCRYPT_PASSWORD]', { password, encryptPassword });

    data.password = encryptPassword;

    const auth = await this.auth.createAuth(data);

    this.logger.log('[SUCCESS]', auth);

    const profile = await this.profile.createProfile({ user_id: auth.id })
    this.logger.log('[SUCCESS]', profile)
    this.mail.send({
      to: process.env.MAIL_TO,
      from: auth.email,
      subject: `🧑‍🎓 ${MAIL_NAME} - Bem-vindo ${auth.fullname.split(' ')[0]}!`,
      template: 'welcome',
      html: `<h1>Bem-vindo ${auth.fullname.split(' ')[0]}!</h1>`,
    });
    return { success: 'Registered with success' };
  }
}

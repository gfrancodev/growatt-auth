import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { IAuth } from 'src/modules/shared/interfaces/iauth';
import { LoginDTO } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { config } from 'dotenv';
import { IRoles } from 'src/modules/shared/interfaces/iroles';
config();

@Injectable()
export class LoginService {
  protected logger = new Logger(LoginService.name);
  constructor(
    @Inject('Auth')
    private readonly auth: IAuth,
    @Inject('Role')
    private readonly role: IRoles,
    private readonly jwt: JwtService,
  ) {}

  async execute(data: LoginDTO) {
    const { email, username, password } = data;
    this.logger.debug('[INPUT]', data);

    const user = await this.auth.findOneAuth({ email, username });

    this.logger.debug('[USER]', user);

    if (!user) {
      this.logger.debug('[ERROR]', 'E-mail or Username is not exists.');
      throw new ForbiddenException('E-mail or Username is not exists.');
    }

    if (!compareSync(password, user.password)) {
      this.logger.error('[ERROR]', 'Password is invalid.');
      throw new ForbiddenException('Password is invalid.');
    }

    const { id, fullname } = user;
    this.logger.log('[ID]', id);

    const permission = await this.role.findAllRolesByUserId(id)

    const roles = await Promise.all(permission.flatMap(async({ name }) => {
      return name
    }))

    this.logger.log('[ROLES]', roles);

    const access_token = this.jwt.sign(
      { id, fullname, email, username, roles },
      { secret: process.env.JWT_SECRET_KEY },
    );

    this.logger.log('[ACCESS_TOKEN]', access_token);
    return { access_token };
  }
}

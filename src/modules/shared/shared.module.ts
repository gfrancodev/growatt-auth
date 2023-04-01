import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { JwtStrategy } from './config/jwt.strategy';
import { AuthRepository } from './repositories/prisma/auth.repository';
import { CodeRepository } from './repositories/prisma/code.repository';
import { RoleRepository } from './repositories/prisma/role.repository';
import { PrismaHelper } from './helpers/prisma.helper';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { NodeMailerProvider } from './providers/nodemailer/nodemailer.provider';
import { GenerateCodeUtil } from './utils/generate-code.util';
import { DateUtil } from './utils/date.util';
import { join } from 'path';
import { TokenRepository } from './repositories/prisma/token.repository';
import { ProfileRepository } from './repositories/prisma/profile.repository';
import { AWSS3Provider } from './providers/upload/aws-s3.provider';

config();

const { MAIL_NAME, MAIL_TO, MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } =
  process.env;

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '30mn' },
    }),
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        port: Number(MAIL_PORT),
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: `"${MAIL_NAME}" <${MAIL_TO}>`,
      },
      preview: true,
      template: {
        dir: join(process.env.PWD, 'dist/modules/shared/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    JwtService,
    JwtStrategy,
    PrismaHelper,
    {
      provide: 'Upload',
      useClass: AWSS3Provider,
    },
    {
      provide: 'Token',
      useClass: TokenRepository,
    },
    {
      provide: 'Date',
      useClass: DateUtil,
    },
    {
      provide: 'GenerateCode',
      useClass: GenerateCodeUtil,
    },
    {
      provide: 'Mail',
      useClass: NodeMailerProvider,
    },
    {
      provide: 'Auth',
      useClass: AuthRepository,
    },
    {
      provide: 'Code',
      useClass: CodeRepository,
    },
    {
      provide: 'Role',
      useClass: RoleRepository,
    },
    {
      provide: 'Profile',
      useClass: ProfileRepository,
    },
  ],
  exports: [
    JwtService,
    JwtStrategy,
    PrismaHelper,
    {
      provide: 'Upload',
      useClass: AWSS3Provider,
    },
    {
      provide: 'Token',
      useClass: TokenRepository,
    },
    {
      provide: 'Date',
      useClass: DateUtil,
    },
    {
      provide: 'GenerateCode',
      useClass: GenerateCodeUtil,
    },
    {
      provide: 'Mail',
      useClass: NodeMailerProvider,
    },
    {
      provide: 'Auth',
      useClass: AuthRepository,
    },
    {
      provide: 'Code',
      useClass: CodeRepository,
    },
    {
      provide: 'Role',
      useClass: RoleRepository,
    },
    {
      provide: 'Profile',
      useClass: ProfileRepository,
    },
  ],
})
export class SharedModule {}

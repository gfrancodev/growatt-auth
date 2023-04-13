import { Controller, Post, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { ConfirmEmailService } from '../services/confirm-email.service';
import { ConfirmResetEmailService } from '../services/confirm-reset-email.service';
import { ResetEmailService } from '../services/reset-email.service';
import { ResetPasswordService } from '../services/reset-password.service';
import { RequestResetPasswordService } from '../services/request-reset-password.service';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/reigster.dto';
import { ConfirmEmailDTO } from '../dtos/confirm-email.dto';
import { ConfirmResetEmailDTO } from '../dtos/confirm-reset-email.dto';
import { ConfirmResetPasswordDTO } from '../dtos/confirm-reset-password.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { ResetEmailDTO } from '../dtos/reset-email.dto';
import { RequestResetEmailService } from '../services/request-reset-email.service';
import { RequestResetPasswordDTO } from '../dtos/request-reset-password';
import { RequesResetEmailDTO } from '../dtos/request-reset-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/shared/guards/jwt.guard';
import { Public } from 'src/modules/shared/decorators/public.decorator';
import { RequestConfirmEmailService } from '../services/request-confirm-email.service';
import { RolesGuard } from 'src/modules/shared/guards/roles.guard';
import { ConfirmResetPasswordService } from '../services/confirm-reset-password.service';

@ApiTags('Autenticação')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly confirmEmailService: ConfirmEmailService,
    private readonly confirmResetEmailService: ConfirmResetEmailService,
    private readonly confirmResetPasswordService: ConfirmResetPasswordService,
    private readonly resetEmailService: ResetEmailService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly requestResetEmailService: RequestResetEmailService,
    private readonly requestConfirmEmailService: RequestConfirmEmailService,
    private readonly requestResetPasswordService: RequestResetPasswordService,
  ) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.loginService.execute(body);
  }

  @Public()
  @HttpCode(201)
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.registerService.execute(body);
  }

  @Public()
  @HttpCode(200)
  @Post('confirm/email')
  async confirmEmail(@Body() body: ConfirmEmailDTO) {
    return await this.confirmEmailService.execute(body);
  }

  @Public()
  @HttpCode(200)
  @Post('confirm/reset/email')
  async confirmResetEmail(@Body() body: ConfirmResetEmailDTO) {
    return await this.confirmResetEmailService.execute(body);
  }

  @Public()
  @HttpCode(200)
  @Post('confirm/reset/password')
  async confirmResetPassword(@Body() body: ConfirmResetPasswordDTO) {
    return await this.confirmResetPasswordService.execute(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Post('request/confirm/email')
  async requestConfirmEmail(@Request() req) {
    return await this.requestConfirmEmailService.execute(req.user.id);
  }


  @Public()
  @HttpCode(200)
  @Post('request/reset/email')
  async requestResetEmail(@Body() body: RequesResetEmailDTO) {
    return await this.requestResetEmailService.execute(body);
  }


  @Public()
  @HttpCode(200)
  @Post('request/reset/password')
  async requestResetPassword(@Body() body: RequestResetPasswordDTO) {
    return await this.requestResetPasswordService.execute(body);
  }

  @Public()
  @HttpCode(200)
  @Post('reset/password')
  async resetPassword(@Body() body: ResetPasswordDTO) {
    return await this.resetPasswordService.execute(body);
  }

  @Public()
  @HttpCode(200)
  @Post('reset/email')
  async resetEmail(@Body() body: ResetEmailDTO) {
    return await this.resetEmailService.execute(body);
  }
}

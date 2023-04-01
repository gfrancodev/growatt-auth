import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMail } from '../../interfaces/imail';

@Injectable()
export class NodeMailerProvider implements IMail {
  protected logger = new Logger(NodeMailerProvider.name);
  constructor(private readonly mailerService: MailerService) {}

  send(data: Mail.Data): void {
    try {
      this.mailerService.sendMail(data);
      this.logger.debug('[SENDMAIL]', data);
    } catch (error) {
      this.logger.error('[SENDMAIL]', error.message);
      console.error(error);
    }
  }
}

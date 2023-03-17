import { Module } from "@nestjs/common";
import { ConfirmEmailService } from "./services/confirm-email.service";
import { ConfirmResetEmailService } from "./services/confirm-reset-email.service";
import { ConfirmResetPasswordService } from "./services/confirm-reset-password.service";
import { RequestResetEmailService } from "./services/request-reset-email.service";
import { RequestResetPasswordService } from "./services/request-reset-password.service";
import { ResetEmailService } from "./services/reset-email.service";
import { ResetPasswordService } from "./services/reset-password.service";
import { RegisterService } from "./services/register.service";
import { LoginService } from "./services/login.service";

@Module({
    controllers: [],
    providers: [
        ConfirmEmailService,
        ConfirmResetEmailService,
        ConfirmResetPasswordService,
        RequestResetEmailService,
        RequestResetPasswordService,
        ResetEmailService,
        ResetPasswordService,
        RegisterService,
        LoginService
    ]
})
export class AuthModule {}
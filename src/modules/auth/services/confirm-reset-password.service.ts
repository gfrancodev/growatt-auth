import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ConfirmResetPasswordDTO } from "../dtos/confirm-reset-password.dto";

@Injectable()
export class ConfirmResetPasswordService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth
    ){}
    
    async execute(data: ConfirmResetPasswordDTO) {
        return 
    }
}
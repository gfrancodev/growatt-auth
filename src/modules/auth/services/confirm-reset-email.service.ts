import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ICode } from "src/modules/shared/interfaces/icode";
import { ConfirmResetEmailDTO } from "../dtos/confirm-reset-email.dto";

@Injectable()
export class ConfirmResetEmailService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
        @Inject('Code')
        private readonly code: ICode
    ){}
    
    async execute(data: ConfirmResetEmailDTO) {
        return 
    }
}
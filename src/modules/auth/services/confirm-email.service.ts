import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ICode } from "src/modules/shared/interfaces/icode";
import { ConfirmEmailDTO } from "../dtos/confirm-email.dto";

@Injectable()
export class ConfirmEmailService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
        @Inject('Code')
        private readonly code: ICode
    ){}
    
    async execute(data: ConfirmEmailDTO) {
        return 
    }
}
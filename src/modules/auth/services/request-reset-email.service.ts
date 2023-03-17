import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ICode } from "src/modules/shared/interfaces/icode";
import { RequesResetEmailDTO } from "../dtos/request-reset-email.dto";

@Injectable()
export class RequestResetEmailService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
        @Inject('Code')
        private readonly code: ICode
    ){}
    
    async execute(data: RequesResetEmailDTO) {
        return 
    }
}
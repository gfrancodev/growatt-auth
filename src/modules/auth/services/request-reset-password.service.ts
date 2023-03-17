import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ICode } from "src/modules/shared/interfaces/icode";
import { RequestResetPasswordDTO } from "../dtos/request-reset-password";

@Injectable()
export class RequestResetPasswordService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
        @Inject('Code')
        private readonly code: ICode
    ){}
    
    async execute(data: RequestResetPasswordDTO) {
        return 
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ResetPasswordDTO } from "../dtos/reset-password.dto";

@Injectable()
export class ResetPasswordService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
    ){}

    async execute(data: ResetPasswordDTO) {
        return 
    }
}
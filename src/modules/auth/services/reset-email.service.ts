import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { ResetEmailDTO } from "../dtos/reset-email.dto";

@Injectable()
export class ResetEmailService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
    ){}

    async execute(data: ResetEmailDTO) {
        return 
    }
}
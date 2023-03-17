import { Inject, Injectable } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { IRoles } from "src/modules/shared/interfaces/iroles";
import { LoginDTO } from "../dtos/login.dto";

@Injectable()
export class LoginService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
        @Inject('Role')
        private readonly role: IRoles
    ){}

    async execute(data: LoginDTO) {
        return 
    }
}
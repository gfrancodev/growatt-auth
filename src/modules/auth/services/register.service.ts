import { Inject, Injectable, ForbiddenException } from "@nestjs/common";
import { IAuth } from "src/modules/shared/interfaces/iauth";
import { IRoles } from "src/modules/shared/interfaces/iroles";
import { RegisterDTO } from "../dtos/reigster.dto";
import { genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class RegisterService {
    constructor(
        @Inject('Auth')
        private readonly auth: IAuth,
    ){}
    
    async execute(data: RegisterDTO) {
        const { email, username, password }= data
        const user = await this.auth.findOneAuth({ email, username })

        if (user) throw new ForbiddenException('E-mail or Username already exists.')
        
        const encryptPassword = hashSync(password, genSaltSync(12))

        data.password = encryptPassword
        
        await this.auth.createAuth(data)

        return { success: 'Registered with success' }
    }
}
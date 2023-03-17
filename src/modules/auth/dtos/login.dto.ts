import { IsString } from "class-validator"

export class LoginDTO {
    @IsString()
    email: string

    @IsString()
    username: string 

    @IsString()
    password: string
}
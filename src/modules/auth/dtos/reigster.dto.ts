import { IsBoolean, IsString } from "class-validator"

export class RegisterDTO {
    @IsString()
    fullname: string
    
    @IsString()
    email: string

    @IsString()
    username: string 

    @IsString()
    cellphone: string

    @IsString()
    gender: string

    @IsString()
    password: string 

    @IsBoolean()
    terms: boolean
}
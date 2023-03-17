import { IsString } from "class-validator"

export class ResetEmailDTO {
    @IsString()
    email: string

    @IsString()
    token: string
}
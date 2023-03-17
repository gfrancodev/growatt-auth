import { IsString } from "class-validator";

export class ConfirmResetPasswordDTO {
    @IsString()
    code: string 
}
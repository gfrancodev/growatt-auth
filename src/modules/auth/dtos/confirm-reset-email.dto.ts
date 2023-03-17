import { IsString } from "class-validator";

export class ConfirmResetEmailDTO {
    @IsString()
    code: string 
}
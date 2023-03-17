import { IsString } from "class-validator";

export class ConfirmEmailDTO {
    @IsString()
    code: string 
}
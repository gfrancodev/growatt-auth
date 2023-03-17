import { IsString } from "class-validator";

export class RequesResetEmailDTO {
    @IsString()
    email: string 
}
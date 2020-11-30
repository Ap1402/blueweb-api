import { ShutdownSignal } from "@nestjs/common";

export interface createUserDto {
    username: string;
    password: string;
    confirmPassword: string;
    dni:number;
    identification:string;
}

export interface createUserDto {
    username: string;
    password: string;
    confirmPassword: string;
    dni: number;
    identification: string;
    roleId?: number
}
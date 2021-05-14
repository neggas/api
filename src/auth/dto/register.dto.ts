import { IsEmail, IsString, Max, Min, ValidateIf } from 'class-validator';

export class UserInfosDto{

    @IsString({message:"username doit etre une chaine"})
    username:string
    @IsString({message:"username doit etre une chaine"})
    firstname:string

    @IsString({message:"username doit etre une chaine"})
    lastname:string

    @IsEmail()
    email:string

    password:string

    @ValidateIf( o => o.password === "confirm_password")
    confirm_password:string
}
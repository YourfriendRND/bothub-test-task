import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
    
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    public email!: string;

    @IsNotEmpty()
    @IsString()
    public password!: string;
    
}

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export default class CreatedUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;
    
    @IsString()
    @IsNotEmpty()
    public username!: string;
}


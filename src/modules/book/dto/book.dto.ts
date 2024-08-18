import {
    IsNotEmpty,
    IsString,
    IsDateString
} from 'class-validator';

export class BookDTO {
    @IsNotEmpty()
    @IsString()
    public title!: string; 

    @IsNotEmpty()
    @IsString()
    public author!: string;

    @IsNotEmpty()
    @IsDateString()
    public publicationDate!: Date;

    @IsNotEmpty()
    @IsString()
    public genres!: string;
}
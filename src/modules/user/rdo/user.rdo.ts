import { Expose } from 'class-transformer';

export class UserRDO {
    @Expose()
    public id!: string;
    
    @Expose()
    public username!: string;
    
    @Expose()
    public email!: string;

    @Expose()
    public isAdmin!: boolean;
    
    @Expose()
    public registrationDate!: Date;
}
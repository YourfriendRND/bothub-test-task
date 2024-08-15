import { Expose } from 'class-transformer';

export class UserAccessRDO { 
    @Expose()
    public accessToken!: string;
}
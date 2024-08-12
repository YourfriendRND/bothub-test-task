import { BaseEntity, UserInterface } from '../../types';

export class UserEntity implements BaseEntity, UserInterface {
    public id?: string;
    public username!: string;
    public passwordHash!: string;
    public email!: string;
    public isAdmin!: boolean;
    public registrationDate?: Date;
    public updatedAt?: Date;
    public updatedBy?: string;

    constructor(user: UserInterface) {
        this.populate(user);
    }

    public populate(user: UserInterface): void {
        this.id = user.id;
        this.username = user.username;
        this.passwordHash = user.passwordHash;
        this.email = user.email;
        this.isAdmin = user.isAdmin;
        this.registrationDate = user.registrationDate;
        this.updatedAt = user.updatedAt;
        this.updatedBy = user.updatedBy;
    }

    static fromObject(user: UserInterface): UserEntity {
        return new UserEntity(user);
    }

}

import { BaseEntity, UserInterface } from '../../types';

export class UserEntity implements BaseEntity, UserInterface {
    public id?: string;
    public username!: string;
    public passwordHash!: string;
    public email!: string;
    public isAdmin!: boolean;
    public isEmailConfirmed!: boolean;
    public registrationDate?: Date;
    public updatedAt?: Date;
    public updatedBy?: string | null;

    constructor(user: UserInterface) {
        this.populate(user);
    }

    public populate(user: UserInterface): void {
        this.id = user.id;
        this.username = user.username;
        this.passwordHash = user.passwordHash;
        this.email = user.email;
        this.isAdmin = user.isAdmin ?? false;
        this.isEmailConfirmed = user.isEmailConfirmed ?? false;
        this.registrationDate = user.registrationDate;
        this.updatedAt = user.updatedAt;
        this.updatedBy = user.updatedBy;
    }

    public toObject(): Record<string, unknown> {
        return {
            id: this.id,
            username: this.username,
            passwordHash: this.passwordHash,
            email: this.email,
            isAdmin: this.isAdmin,
            isEmailConfirmed: this.isEmailConfirmed,
            registrationDate: this.registrationDate,
            updatedAt: this.updatedAt,
            updatedBy: this.updatedBy
        }
    }

    static fromObject(user: UserInterface): UserEntity {
        return new UserEntity(user);
    }

}

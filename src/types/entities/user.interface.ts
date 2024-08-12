export interface UserInterface {
    id?: string;
    username: string;
    passwordHash: string;
    email: string;
    isAdmin: boolean;
    registrationDate?: Date;
    updatedAt?: Date;
    updatedBy?: string;
}

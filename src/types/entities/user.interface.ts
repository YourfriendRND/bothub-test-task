export interface UserInterface {
    id?: string;
    username: string;
    passwordHash: string;
    email: string;
    isAdmin: boolean;
    isEmailConfirmed: boolean;
    registrationDate?: Date;
    updatedAt?: Date;
    updatedBy?: string | null;
}

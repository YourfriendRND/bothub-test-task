import { Transporter } from 'nodemailer';

export interface MailInterface {
    readonly client: Transporter;
    sendActivateEmail: (email: string, link: string) => Promise<void>;
}

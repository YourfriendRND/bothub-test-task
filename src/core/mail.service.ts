import { inject, injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { ApplicationConfigSchema, ConfigIntreface, MailInterface } from '../types';
import { ApplicationComponents } from './dictionary/app.js';

@injectable()
export class MailService implements MailInterface {
    private _client: Transporter;

    constructor(
        @inject(ApplicationComponents.Config)
        private readonly config: ConfigIntreface<ApplicationConfigSchema>
    ) {
        this._client = nodemailer.createTransport({
            host: config.get('SMTP_HOST'),
            port: config.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: config.get('SMTP_EMAIL'),
                pass: config.get('SMTP_PASSWORD'),
            }
        })
    }

    get client() {
        return this._client;
    }

    public async sendActivateEmail(email: string, link: string): Promise<void> {
        await this.client.sendMail({
            from: this.config.get('SMTP_EMAIL'),
            to: email,
            subject: 'Bothub-test-task: Confirm your email',
            text: '',
            html: `
                <div>   
                    <h2>Confirm your email</h2>  
                    <p>Click the link below to activate your email in our application</p>
                    <a href="${link}">${link}</a>

                    Best regards,
                    <strong>Bothub-test-task<strong>
                </div>
            `   
        })
    }
}

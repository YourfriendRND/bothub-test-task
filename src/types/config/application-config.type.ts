export type ApplicationConfigSchema = {
    PORT: number;
    SALT: string;
    SECRET_ACCESS_KEY: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_EMAIL: string;
    SMTP_PASSWORD: string;
    APPLICATION_URL: string;
}

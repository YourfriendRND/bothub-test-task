import { config } from 'dotenv';
import Joi from 'joi';
import { inject, injectable } from 'inversify';
import { Logger } from './logger.service.js';
import { ApplicationComponents } from './dictionary/app.js';
import { ApplicationConfigSchema, ConfigIntreface } from '../types';

@injectable()
export class ConfigService implements ConfigIntreface<ApplicationConfigSchema> {
    private schema: ApplicationConfigSchema;

    constructor(
        @inject(ApplicationComponents.Logger) private readonly logger: Logger
    ) {
        const parsedOutput = config();

        if (parsedOutput.error) {
            throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
        }

        this.schema = {
            PORT: parseInt(process.env['PORT']!, 10),
            SALT: process.env['SALT']!,
            SECRET_ACCESS_KEY: process.env['SECRET_ACCESS_KEY']!,
            SMTP_HOST: process.env['SMTP_HOST']!,
            SMTP_PORT: parseInt(process.env['SMTP_PORT']!, 10),
            SMTP_EMAIL: process.env['SMTP_EMAIL']!,
            SMTP_PASSWORD: process.env['SMTP_PASSWORD']!,
            APPLICATION_URL: process.env['APPLICATION_URL']!,
        };

        this.validateApplicationConfig(this.schema);

        this.logger.log(`${ConfigService.name} has been initialized`);
    }

    private validateApplicationConfig(config: ApplicationConfigSchema): void {
        
        const validationSchema = Joi.object({
            PORT: Joi.number().required(),
            SALT: Joi.string().required(),
            SECRET_ACCESS_KEY: Joi.string().required(),
            SMTP_HOST: Joi.string().required(),
            SMTP_PORT: Joi.number().required(),
            SMTP_EMAIL: Joi.string().required(),
            SMTP_PASSWORD: Joi.string().required(),
            APPLICATION_URL: Joi.string().required(),
        });
        
        const { error } = validationSchema.validate(config, { abortEarly: true });

        if (error) {
            throw new Error(`Application Config Validation Error: ${error.message}`)
        }

    }

    public get<U extends keyof ApplicationConfigSchema>(key: U): ApplicationConfigSchema[U] {
        return this.schema[key];
    };
}

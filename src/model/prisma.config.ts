import joi from 'joi'; 
import { config } from 'dotenv';
import { writeFile, unlink, access  } from 'fs/promises';
import { PrismaConfigSchema } from './../types'

const validationSchema = joi.object({
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_DB: joi.string().required(),
})

function validateConfig(config: PrismaConfigSchema): void {
    const { error } = validationSchema.validate(config, { abortEarly: true });

    if (error) {
        throw new Error(`[Prisma Config Validation Error]: ${error.message}`)
    }
}

function getAppConfig(): PrismaConfigSchema {
    const appConfig: PrismaConfigSchema = {
        POSTGRES_USER: process.env['POSTGRES_USER']!,
        POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD']!,
        POSTGRES_HOST: process.env['POSTGRES_HOST']!,
        POSTGRES_PORT: parseInt(process.env['POSTGRES_PORT']!, 10),
        POSTGRES_DB: process.env['POSTGRES_DB']!
    };

    validateConfig(appConfig);

    return appConfig;
}

function createConnectionString(config: PrismaConfigSchema): string {
    return `"postgresql://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:${config.POSTGRES_PORT}/${config.POSTGRES_DB}?schema=public&connect_timeout=300"`
}

function createEnvConfig(config: Record<string, unknown>): string {
    return Object.entries(config).map(([key, value]) => `${key}=${value}`).join('\n');
}

async function updateAppEnvFile(configContent: string): Promise<void> {
    try {
        const env = await access('./src/model/.env').then(() => true).catch(() => false);
        
        if (env) {
            await unlink('./src/model/.env');
        }
    } catch {
        console.error('Prisma .env file does not exist');
    }
    finally {
        await writeFile('./src/model/prisma/.env', configContent);
    }
}

async function generate(): Promise<void> {
    config()
    const envConfig = getAppConfig();
    const dbConnectionString = createConnectionString(envConfig);
    const configContent = createEnvConfig({
        ...{
            DATABASE_URL: dbConnectionString,
        }
    })
    await updateAppEnvFile(configContent);
    console.log('File .env for Prisma successfuly updated 👍');
}

generate();

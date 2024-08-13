import { PrismaClient } from '@prisma/client';

export interface RepositoryInterface<T, D = object> {
    readonly client: PrismaClient;
    createEntityFromDocument(document: D): T | null 
    create: (data: T) => Promise<T>;
    findOne: (id: string) => Promise<T>;
    update: (id: string, data: T) => Promise<T>;
}
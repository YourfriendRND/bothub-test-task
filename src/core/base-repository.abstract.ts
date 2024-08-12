
import { BaseEntity } from '../types';
import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<
    T extends BaseEntity,
    DocumentType = object,
> {
    protected readonly prismaClient: PrismaClient;
    constructor(
        private readonly createEntity: (document: DocumentType) => T,    
    ) {
        this.prismaClient = new PrismaClient({
            log: ['query', 'warn', 'error'],
        });

        this.prismaClient.$connect();
    }

    protected createEntityFromDocument(document: DocumentType): T | null {
        if (!document) {
          return null;
        }
    
        return this.createEntity(document);
    }

    public abstract create(data: T): Promise<T>;
    public abstract findOne(id: string): Promise<T>;
    public abstract update(id: string, data: T): Promise<T>;
}

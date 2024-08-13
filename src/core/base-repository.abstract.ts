import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { BaseEntity } from '../types';
import { RepositoryInterface } from '../types';

@injectable()
export abstract class BaseRepository<
    T extends BaseEntity,
    DocumentType = object,
> implements RepositoryInterface<T, DocumentType>{
    private readonly _client: PrismaClient;
    constructor(
        private readonly createEntity: (document: DocumentType) => T,    
    ) {
        this._client = new PrismaClient({
            log: ['query', 'warn', 'error'],
        });

        this._client.$connect();
    }

    get client () {
        return this._client;
    }

    public createEntityFromDocument(document: DocumentType): T {
        if (!document) {
          throw new Error('The document from database is empty, please check request');
        }
    
        return this.createEntity(document);
    }

    public abstract create(data: T): Promise<T>;
    public abstract findOne(id: string): Promise<T>;
    public abstract update(id: string, data: T): Promise<T>;
}

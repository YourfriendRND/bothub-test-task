import { inject, injectable } from 'inversify';
import { BaseRepository } from '../../core/base-repository.abstract.js';
import { BookEntity } from './book.entity.js';
import { LoggerInterface, Pagination } from '../../types/index.js';
import { BookInterface } from '../../types/entities/book.interface';
import { ApplicationComponents } from '../../core/dictionary/app.js';

@injectable()
export class BookRepository extends BaseRepository<BookEntity, BookInterface> {
    constructor(
        @inject(ApplicationComponents.Logger) 
        private readonly logger: LoggerInterface
    ) {
        super(BookEntity.fromObject);
        this.logger.log(`${BookRepository.name} has been initialized`);
    }

    public async getBooks({ page, limit }: Pagination): Promise<BookEntity[]> {
        const skipCount = page && page > 1 ? page * limit : 0;
        const books = await this.client.book.findMany({
            take: limit,
            skip: skipCount,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return books.map((book) => this.createEntityFromDocument(book));
    }

    public async create(data: BookEntity): Promise<BookEntity> {
        const book = await this.client.book.create({
            data: {
                title: data.title,
                author: data.author,
                genres: data.genres,
                publicationDate: new Date(data.publicationDate),
                updatedBy: data.addedBy,
                createdBy: {
                    connect: {
                        id: data.addedBy
                    }
                }
            },
        });

        return this.createEntityFromDocument(book);
    }

    public async update(id: string, data: BookEntity): Promise<BookEntity> {
        const book = await this.client.book.update({
            where: {
                id
            },
            data: {
                ...data
            }
        });

        return this.createEntityFromDocument(book);
    }

    public async findOne(id: string): Promise<BookEntity | null> {
        const book = await this.client.book.findUnique({
            where: {
                id
            }
        });

        if (book) {
            return this.createEntityFromDocument(book);
        }

        return null;
    }

    public async findByTitle(title: string): Promise<BookEntity | null> {
        const book = await this.client.book.findFirst({
            where: {
                title
            }
        });

        if (book) {
            return this.createEntityFromDocument(book);
        }

        return null;
    }

    public async delete(id: string): Promise<void> {
        await this.client.book.delete({
            where: {
                id
            }
        });
    }
}
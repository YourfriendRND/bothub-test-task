import { BookInterface } from '../../types/entities/book.interface';
import { BaseEntity } from '../../types';

export class BookEntity implements BaseEntity, BookInterface {
    public id?: string;
    public title!: string;
    public author!: string;
    public publicationDate!: Date;
    public genres!: string;
    public addedBy!: string;
    public updatedBy!: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(data: BookInterface) {
        this.populate(data);
    }

    public populate(book: BookInterface): void {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.publicationDate = book.publicationDate;
        this.genres = book.genres;
        this.addedBy = book.addedBy;
        this.updatedBy = book.updatedBy;
        this.createdAt = book.createdAt;
        this.updatedAt = book.updatedAt;
    }

    public toObject(): Record<string, unknown> {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            publicationDate: this.publicationDate,
            genres: this.genres,
            addedBy: this.addedBy,
            updatedBy: this.updatedBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    static fromObject(book: BookInterface): BookEntity {
        return new BookEntity(book);
    }
}

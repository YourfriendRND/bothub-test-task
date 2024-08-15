import { injectable, inject } from 'inversify';
import { LoggerInterface, Pagination } from '../../types';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { BookDTO } from './dto/book.dto.js';
import { BookEntity } from './book.entity.js';
import { BookRepository } from './book.repository.js';
import { HttpError } from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class BookService {

    constructor(
        @inject(ApplicationComponents.Logger)
        private readonly logger: LoggerInterface,
        @inject(ApplicationComponents.BookRepository)
        private readonly bookRepository: BookRepository,
    ) {
        this.logger.log(`${BookService.name} has been initialized`);
    }

    public async createBook(book: BookDTO, adminId: string): Promise<BookEntity> {
        const existBook = await this.bookRepository.findByTitle(book.title);

        if (existBook) {
            throw new HttpError(
                StatusCodes.CONFLICT,
                `The book with title ${book.title} already exist in library.
                You can take it by id: ${existBook.id}`,
                `[${BookService.name}]`
            )
        }
        const bookEntity = new BookEntity({
            title: book.title,
            author: book.author,
            publicationDate: book.publicationDate,
            genres: book.genres,
            addedBy: adminId,
            updatedBy: adminId
        });
        const createdBook = await this.bookRepository.create(bookEntity);
        return createdBook;
    }

    public async getBooks(pagination: Pagination): Promise<BookEntity[]> {
        return await this.bookRepository.getBooks(pagination);
    }

    public async findBook(id: string): Promise<BookEntity> {
        const book = await this.bookRepository.findOne(id);

        if (!book) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Book with id: ${id} not found`,
                `[${BookService.name}]`
            );
        }

        return book;

    }

    public async updateBook(id: string, adminId: string, updatedBook: BookDTO): Promise<BookEntity> {
        const targetBook = await this.findBook(id);

        if (!targetBook) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Book with id: ${id} not found`,
                `[${BookService.name}]`
            )
        }

       targetBook.title = updatedBook.title;
       targetBook.author = updatedBook.author;
       targetBook.publicationDate = updatedBook.publicationDate;
       targetBook.genres = updatedBook.genres;
       targetBook.updatedBy = adminId;
       
       const book = await this.bookRepository.update(id, targetBook);
       
       return book;
    }

    public async deleteBook(id: string): Promise<void> {
        const book = await this.findBook(id);

        if (book) {
            await this.bookRepository.delete(id);
        }
    }
}
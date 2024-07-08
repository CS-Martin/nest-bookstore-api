import { loadData } from '../utils';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthorDto } from 'src/modules/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/modules/authors/dto/update-author.dto';
import { BooksService } from 'src/modules/books/books.service';
import { BooksDbService } from '../books-db-lib/books-db-lib.service';

@Injectable()
export class AuthorsDbService {
    private logger = new Logger(AuthorsDbService.name);
    public Authors = loadData().authors;

    constructor(
        @Inject(forwardRef(() => BooksService))
        private readonly booksService: BooksService,
        @Inject(forwardRef(() => BooksDbService))
        private readonly booksDbService: BooksDbService,
    ) {}

    createAuthor(newAuthor: CreateAuthorDto): void {
        this.logger.log('Creating author:', newAuthor);
        this.Authors.push(newAuthor);
    }

    updateAuthor(authorToUpdate: UpdateAuthorDto): void {
        this.logger.log('Updating author:', authorToUpdate);
        this.Authors = this.Authors.map((author) =>
            author.id === authorToUpdate.id
                ? { ...author, ...authorToUpdate }
                : author,
        );
    }

    deleteAuthor(authorToDelete: CreateAuthorDto): void {
        this.logger.log('Deleting author:', authorToDelete);
        this.Authors = this.Authors.filter(
            (author) => author.id !== authorToDelete.id,
        );

        // Remove the author's books
        authorToDelete.books.forEach((bookId) =>
            this.booksDbService.removeAuthorFromBook(bookId, authorToDelete.id),
        );
    }

    getAllAuthors(): CreateAuthorDto[] {
        return this.Authors.map((author) => {
            this.logger.log('Author:', author);
            const books = author.books.map(
                (bookId) => this.booksService.findOne(bookId).title,
            );
            return { ...author, books };
        });
    }

    getAuthorWithBooksId(id: number): CreateAuthorDto {
        return this.Authors.find((author) => author.id === id);
    }

    getAuthorWithBooksName(id: number): CreateAuthorDto {
        const author = this.Authors.find((author) => author.id === id);
        if (author) {
            const books = author.books.map(
                (bookId) => this.booksService.findOne(bookId).title,
            );
            return { ...author, books };
        }
    }

    removeBookFromAuthor(authorId: number, bookId: number): void {
        this.logger.log('Removing book:', bookId, 'from author:', authorId);
        const author = this.getAuthorWithBooksId(authorId);
        if (author) {
            author.books = author.books.filter((book) => book !== bookId);
        }
    }
}

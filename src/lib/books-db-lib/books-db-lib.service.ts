import { AuthorsService } from 'src/modules/authors/authors.service';
import { loadData } from '../utils';
import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from 'src/modules/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/modules/books/dto/update-book.dto';
import { AuthorsDbService } from '../authors-db-lib/authors-db-lib.service';

/**
 * * All database interaction should be done through this service
 */
@Injectable()
export class BooksDbService {
    private logger = new Logger(BooksDbService.name);
    public Books = loadData().books;

    constructor(
        private readonly authorsService: AuthorsService,
        private readonly authorsDbService: AuthorsDbService,
    ) {}

    createBook(book: CreateBookDto) {
        this.logger.log('Creating book:', book);

        this.Books.push(book);
    }

    updateBook(bookToUpdate: UpdateBookDto) {
        this.logger.log('Updating book:', bookToUpdate);
        this.Books = this.Books.map((book) => {
            if (book.id === bookToUpdate.id) {
                return { ...book, ...bookToUpdate };
            }

            console.log(book);
            return book;
        });
    }

    deleteBook(bookToDelete) {
        this.Books = this.Books.filter((book) => book.id !== bookToDelete.id);

        /**
         * If delete a book, delete its referencing id in authors too
         */
        for (const author of bookToDelete.authors) {
            this.authorsDbService.removeBookFromAuthor(
                Number(author),
                bookToDelete.id,
            );
        }
    }

    getAllBooks() {
        return this.Books.map((book) => {
            // Get the authors of the book
            const bookAuthors = book.authors.map(
                (authorId) => this.authorsService.findOne(authorId).name,
            );

            return { ...book, authors: bookAuthors };
        });
    }

    // Used for updating books
    getOneBookWithAuthorsId(id: number) {
        return this.Books.find((book) => book.id === id);
    }

    // Only used for getting books and displaying it
    getOneBookWithAuthorsName(id: number) {
        const book = this.Books.find((book) => book.id === id);
        console.log(book);

        if (book) {
            const bookAuthors = book.authors.map((authorId) => {
                const author = this.authorsService.findOne(authorId);
                return author ? author.name : 'Unknown Author';
            });

            return { ...book, authors: bookAuthors };
        }
    }

    removeAuthorFromBook(bookId: number, authorId: number) {
        this.logger.log('Removing author:', authorId, 'from book:', bookId);

        const book: CreateBookDto = this.getOneBookWithAuthorsId(bookId);

        // Remove the book from the author
        if (book) {
            book.authors = book.authors.filter((author) => author !== authorId);
        }

        console.log('HAHAHAHA', book);
    }
}

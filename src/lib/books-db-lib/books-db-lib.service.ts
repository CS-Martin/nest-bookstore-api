import { AuthorsService } from 'src/modules/authors/authors.service';
import { loadData } from '../utils';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/modules/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/modules/books/dto/update-book.dto';
import { Book } from 'src/types/book.types';

/**
 * * All database interaction should be done through this service
 */
@Injectable()
export class BooksDbService {
    public Books: Book[] = loadData().books;

    constructor(private readonly authorsService: AuthorsService) {}

    createBook(book: CreateBookDto) {
        this.Books.push(book);
    }

    updateBook(bookToUpdate: UpdateBookDto) {
        this.Books = this.Books.map((book) => {
            if (book.id === bookToUpdate.id) {
                return { ...book, ...bookToUpdate };
            }

            console.log(book);
            return book;
        });
    }

    deleteBook(bookToDelete: Book) {
        this.Books = this.Books.filter((book) => book.id !== bookToDelete.id);
    }

    getAllBooks() {
        return this.Books.map((book: Book) => {
            const bookAuthors = book.authors.map(
                (authorId) => this.authorsService.findOne(authorId).name,
            );
            console.log(bookAuthors);
            return { ...book, authors: bookAuthors };
        });
    }

    // Used for updating books
    getOneBookWithAuthorsId(id: number) {
        return this.Books.find((book) => book.id === id);
    }

    // ! Only used for getting books and displaying it
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
}

import { Injectable } from '@nestjs/common';
import { loadBooks } from '../utils';
import { BookDto } from 'src/modules/book/dto/book.dto';

@Injectable()
export class BookDbLibService {
    private BooksArray: BookDto[] = loadBooks();

    createBook(book: BookDto): void {
        this.BooksArray.push(book);
    }

    updateBook(bookToUpdate: BookDto): void {
        const bookIndex = this.BooksArray.findIndex(
            (book) => book.id === bookToUpdate.id,
        );

        this.BooksArray[bookIndex] = bookToUpdate;
    }

    deleteBook(bookToDelete: BookDto): void {
        const bookIndex = this.BooksArray.findIndex(
            (book) => book.id === bookToDelete.id,
        );

        this.BooksArray.splice(bookIndex, 1);
    }

    getAllBooks(): BookDto[] | undefined {
        return this.BooksArray;
    }

    getBook(id: string): BookDto | undefined {
        return this.BooksArray.find((book) => book.id === id);
    }

    getBookByTitle(title: string): BookDto | undefined {
        return this.BooksArray.find((book) => book.title === title);
    }

    getBooksArrayLength(): number {
        return this.BooksArray.length;
    }
}

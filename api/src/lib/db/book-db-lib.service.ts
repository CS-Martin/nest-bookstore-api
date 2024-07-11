import { Injectable } from '@nestjs/common';
import { loadBooks } from '../utils';
import { BookDto } from 'src/modules/book/dto/create-book.dto';

@Injectable()
export class BookDbLibService {
    private BooksArray: BookDto[] = loadBooks();

    createBook(book: BookDto): void {
        this.BooksArray.push(book);
    }

    updateBook(bookToUpdate: BookDto): void {
        const bookIndex = bookToUpdate.id;

        this.BooksArray[bookIndex - 1] = bookToUpdate;
    }

    deleteBook(bookToDelete: BookDto): void {
        const bookIndex = bookToDelete.id;

        this.BooksArray.splice(bookIndex - 1, 1);
    }

    getAllBooks(): BookDto[] | undefined {
        return this.BooksArray;
    }

    getBook(id: number): BookDto | undefined {
        return this.BooksArray[id - 1];
    }

    getBookByTitle(title: string): BookDto | undefined {
        return this.BooksArray.find((book) => book.title === title);
    }

    getBooksArrayLength(): number {
        return this.BooksArray.length;
    }
}

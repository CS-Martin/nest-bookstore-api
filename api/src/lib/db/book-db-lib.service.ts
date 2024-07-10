import { CreateBookDto } from './../../modules/book/dto/create-book.dto';
import { Injectable } from '@nestjs/common';
import { loadBooks } from '../utils';

@Injectable()
export class BookDbLibService {
    private BooksArray: CreateBookDto[] = loadBooks();

    createBook(book: CreateBookDto): void {
        this.BooksArray.push(book);
    }

    updateBook(bookToUpdate: CreateBookDto): void {
        const bookIndex = bookToUpdate.id;

        this.BooksArray[bookIndex - 1] = bookToUpdate;
    }

    deleteBook(bookToDelete: CreateBookDto): void {
        const bookIndex = bookToDelete.id;

        this.BooksArray.splice(bookIndex - 1, 1);
    }

    getAllBooks(): CreateBookDto[] | undefined {
        return this.BooksArray;
    }

    getBook(id: number): CreateBookDto | undefined {
        return this.BooksArray.find((book) => book.id === id);
    }

    getBookByTitle(title: string): CreateBookDto | undefined {
        return this.BooksArray.find((book) => book.title === title);
    }

    getBooksArrayLength(): number {
        return this.BooksArray.length;
    }
}

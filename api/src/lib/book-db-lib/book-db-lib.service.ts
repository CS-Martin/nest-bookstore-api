import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/modules/book/dto/create-book.dto';
import { loadBooks } from '../utils';

@Injectable()
export class BookDbLibService {
    private BooksArray: CreateBookDto[] = loadBooks();

    createBook(book: CreateBookDto) {
        this.BooksArray.push(book);
    }

    updateBook(bookToUpdate: CreateBookDto) {
        const bookIndex = bookToUpdate.id;

        this.BooksArray[bookIndex - 1] = bookToUpdate;
    }

    deleteBook(bookToDelete: CreateBookDto) {
        const bookIndex = bookToDelete.id;

        this.BooksArray.splice(bookIndex - 1, 1);
    }

    getAllBooks() {
        console.log(this.BooksArray);
        return this.BooksArray;
    }

    getBook(id: number) {
        return this.BooksArray.find((book) => book.id === id);
    }
}

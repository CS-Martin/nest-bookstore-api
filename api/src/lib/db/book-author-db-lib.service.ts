import { BookAuthorDto } from 'src/modules/book-author/dto/book-author.dto';
import { loadBooksAndAuthors } from '../utils';

export class BookAuthorDbLibService {
    private BookAuthorArray: BookAuthorDto[] = loadBooksAndAuthors();

    createBookAuthorRelationship(bookAuthorDto: BookAuthorDto) {
        this.BookAuthorArray.push(bookAuthorDto);
    }

    getAllBookAuthor() {
        return this.BookAuthorArray;
    }

    deleteBook(bookId: number) {
        this.BookAuthorArray = this.BookAuthorArray.filter(
            (book) => book.book_id !== bookId,
        );
    }

    deleteAuthor(authorId: number) {
        this.BookAuthorArray = this.BookAuthorArray.filter(
            (author) => author.author_id !== authorId,
        );
    }

    getBooksAndAuthorsLength() {
        return this.BookAuthorArray.length;
    }
}

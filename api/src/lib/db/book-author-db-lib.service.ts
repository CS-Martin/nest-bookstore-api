import { BookAuthorDto } from 'src/modules/book-author/dto/book-author.dto';
import { loadBooksAndAuthors } from '../utils';

export class BookAuthorDbLibService {
    private BookAuthorArray: BookAuthorDto[] = loadBooksAndAuthors();

    createBookAuthorRelationship(bookId: number, authorId: number) {
        this.BookAuthorArray.push({ book_id: bookId, author_id: authorId });
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
}

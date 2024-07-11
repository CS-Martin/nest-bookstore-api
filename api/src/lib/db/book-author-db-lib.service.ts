import { CreateBookAuthorDto } from 'src/modules/book-author/dto/create-book-author.dto';
import { loadBooksAndAuthors } from '../utils';

export class BookAuthorDbLibService {
    private BookAuthorArray: CreateBookAuthorDto[] = loadBooksAndAuthors();

    createBookAuthorRelationship(book_id: number, author_id: number) {
        this.BookAuthorArray.push({ book_id, author_id });
    }

    getAllBookAuthor() {
        return this.BookAuthorArray;
    }
}

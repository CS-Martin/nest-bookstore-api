import { CreateBookAuthorDto } from 'src/modules/book-author/dto/create-book-author.dto';
import { loadBooksAndAuthors } from '../utils';

export class BookAuthorDbLibService {
    private BookAuthorArray: CreateBookAuthorDto[] = loadBooksAndAuthors();

    createBookAuthorRelationship(bookId: number, authorId: number) {
        this.BookAuthorArray.push({ bookId, authorId });
    }
}

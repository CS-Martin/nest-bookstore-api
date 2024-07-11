import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { BookService } from '../book/book.service';
import { AuthorService } from '../author/author.service';
import { BookAuthorDbLibService } from 'src/lib/db/book-author-db-lib.service';

@Injectable()
export class BookAuthorService {
    private logger = new Logger(BookAuthorService.name);

    constructor(
        @Inject(forwardRef(() => BookAuthorDbLibService))
        private bookAuthorDbLibService: BookAuthorDbLibService,
        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
        @Inject(forwardRef(() => AuthorService))
        private authorService: AuthorService,
    ) {}

    create(bookId: number, authorId: number) {
        // Verify if the book exists
        const book = this.bookService.findOne(bookId);

        if (!book) {
            throw new NotFoundException(
                `Book with ID ${bookId} not found during book-author relationship creation`,
            );
        }

        // Verify if the author exists
        const author = this.authorService.findOne(authorId);
        if (!author) {
            throw new NotFoundException(
                `Author with ID ${authorId} not found during book-author relationship creation`,
            );
        }

        // Proceed with creating the book-author relationship
        try {
            this.bookAuthorDbLibService.createBookAuthorRelationship({
                id: this.getBooksAndAuthorsLength(),
                book_id: bookId,
                author_id: authorId,
            });

            this.logger.log(
                `Book-author relationship created successfully for book ID ${bookId} and author ID ${authorId}`,
            );
        } catch (error) {
            this.logger.error(
                `Error creating book-author relationship: ${error}`,
            );
            throw new InternalServerErrorException();
        }
    }

    /**
     * @todo: Should I also save the books and authors that has no relationship?
     * Example: Books that has no author/s and authors that has no book/s
     */
    // What about those created books that has no author/s?
    // createBookOnly(bookId: number) {
    //     this.bookAuthorDbLibService.createBookAuthorRelationship({
    //         id: this.getBooksAndAuthorsLength(),
    //         book_id: bookId,
    //         author_id: null,
    //     });
    // }

    // What about those created authors that has no book/s?
    // createAuthorOnly(authorId: number) {
    //     this.bookAuthorDbLibService.createBookAuthorRelationship({
    //         id: this.getBooksAndAuthorsLength(),
    //         book_id: null,
    //         author_id: authorId,
    //     });
    // }

    findAllBooksAndAuthors() {
        const bookAuthorRelationships =
            this.bookAuthorDbLibService.getAllBookAuthor();

        // Map to store books with their authors
        const booksMap = new Map<number, any>();

        bookAuthorRelationships.forEach(async (relationship) => {
            const book = this.bookService.findOne(relationship.book_id);
            const author = this.authorService.findOne(relationship.author_id);

            if (!booksMap.has(book.id)) {
                booksMap.set(book.id, { ...book, authors: [] });
            }

            booksMap.get(book.id).authors.push(author);
        });

        return Array.from(booksMap.values());
    }

    removeBook(bookId: number) {
        this.bookAuthorDbLibService.deleteBook(bookId);
    }

    removeAuthor(authorId: number) {
        this.bookAuthorDbLibService.deleteAuthor(authorId);
    }

    private getBooksAndAuthorsLength() {
        const length = this.bookAuthorDbLibService.getBooksAndAuthorsLength();
        return length > 0 ? length + 1 : 0;
    }
}

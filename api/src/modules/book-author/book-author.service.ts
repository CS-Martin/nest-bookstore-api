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
            this.bookAuthorDbLibService.createBookAuthorRelationship(
                bookId,
                authorId,
            );

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

    findAllBooksAndAuthors() {
        const bookAuthorRelationships =
            this.bookAuthorDbLibService.getAllBookAuthor();

        // Map to store books with their authors
        const booksMap = new Map<number, any>();

        bookAuthorRelationships.map(async (relationship) => {
            const book = this.bookService.findOne(relationship.book_id);
            const author = this.authorService.findOne(relationship.author_id);

            if (!booksMap.has(book.id)) {
                booksMap.set(book.id, { ...book, authors: [] });
            }

            booksMap.get(book.id).authors.push(author);
        });

        return Array.from(booksMap.values());
    }

    findOne(id: number) {
        return `This action returns a #${id} bookAuthor`;
    }
}

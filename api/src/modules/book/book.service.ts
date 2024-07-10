import {
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDbLibService } from 'src/lib/db/book-db-lib.service';
import { AuthorService } from '../author/author.service';
import { BookAuthorService } from '../book-author/book-author.service';

@Injectable()
export class BookService {
    private readonly logger = new Logger(BookService.name);

    constructor(
        @Inject(forwardRef(() => BookDbLibService))
        private readonly bookDbLibService: BookDbLibService,
        @Inject(forwardRef(() => AuthorService))
        private readonly authorService: AuthorService,
        @Inject(forwardRef(() => BookAuthorService))
        private readonly bookAuthorService: BookAuthorService,
    ) {}

    create(createBookDto: CreateBookDto) {
        const existingBook = this.bookDbLibService.getBookByTitle(
            createBookDto.title,
        );

        if (existingBook) {
            throw new NotFoundException('Book already exists');
        }

        try {
            const newBook = {
                id: this.generateId(),
                ...createBookDto,
            };

            if (newBook.authors.length > 0) {
                newBook.authors.forEach((author) => {
                    this.authorService.createBookAuthorRelationship(
                        newBook.id,
                        author,
                    );
                });
            }

            this.bookDbLibService.createBook(newBook);
            return newBook;
        } catch (error) {
            this.logger.error(error);
            throw new Error(`Error creating book: ${createBookDto.title}`);
        }
    }

    createBookAuthorRelationship(authorId: number, book: string) {
        try {
            const createdBook: CreateBookDto = this.create({
                title: book,
                description: '',
                isbn: '',
                authors: [],
            });

            this.bookAuthorService.create({
                bookId: createdBook.id,
                authorId: authorId,
            });
        } catch (error) {
            this.logger.error(error);
            throw new Error(`Error creating book author relationship: ${book}`);
        }
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        const existingBook = this.findOne(id);

        if (!existingBook) {
            throw new NotFoundException('Book not found');
        }

        try {
            const bookToUpdateDto = {
                ...existingBook,
                ...updateBookDto,
            };

            this.bookDbLibService.updateBook(bookToUpdateDto);
        } catch (error) {
            this.logger.error(error);
            throw new Error(`Error updating book: ${updateBookDto.title}`);
        }
    }

    remove(id: number) {
        const bookToDelete = this.findOne(id);

        if (!bookToDelete) {
            throw new NotFoundException('Book not found');
        }

        try {
            this.bookDbLibService.deleteBook(bookToDelete);
        } catch (error) {
            this.logger.error(error);
            throw new Error(`Error deleting book: ${bookToDelete.title}`);
        }
    }

    findAll() {
        return this.bookDbLibService.getAllBooks();
    }

    findOne(id: number) {
        const book = this.bookDbLibService.getBook(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    private generateId(): number {
        const booksArrayLength = this.bookDbLibService.getBooksArrayLength();
        return booksArrayLength > 0 ? booksArrayLength + 1 : 0;
    }
}

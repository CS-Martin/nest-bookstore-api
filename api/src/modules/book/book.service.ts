import {
    ConflictException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { BookDto, CreateBookDto } from './dto/create-book.dto';
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
            throw new ConflictException(
                `Book ${createBookDto.title} already exists`,
            );
        }

        try {
            const newBook: BookDto = {
                id: this.generateId(),
                title: createBookDto.title,
                description: createBookDto.description,
                isbn: createBookDto.isbn,
            };

            this.logger.log(`Creating book ${newBook.title}`);
            this.bookDbLibService.createBook(newBook);
            this.logger.log(`Book ${newBook.title} successfully created`);

            if (createBookDto.authors.length > 0) {
                this.authorService.createBookAuthorRelationship(
                    newBook.id,
                    createBookDto.authors,
                );
            }

            return newBook;
        } catch (error) {
            this.logger.error(
                `Error creating book: ${createBookDto.title}`,
                error.stack,
            );
            throw new Error(`Error creating book: ${createBookDto.title}`);
        }
    }

    createBookAuthorRelationship(authorId: number, book: string[]) {
        try {
            book.forEach((book) => {
                const createdBook: BookDto = this.create({
                    title: book,
                    description: '',
                    isbn: '',
                    authors: [],
                });

                this.logger.log(
                    `Creating book-author relationship for book ${createdBook.title} and author ${authorId}`,
                );
                this.bookAuthorService.create(createdBook.id, authorId);
            });
        } catch (error) {
            this.logger.error(
                `Error creating book author relationship: ${book}`,
                error.stack,
            );
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

            this.logger.log(`Updating book ${bookToUpdateDto.title}`);
            this.bookDbLibService.updateBook(bookToUpdateDto);
            this.logger.log(
                `Book ${bookToUpdateDto.title} successfully updated`,
            );
        } catch (error) {
            this.logger.error(
                `Error updating book: ${updateBookDto.title}`,
                error.stack,
            );
            throw new Error(`Error updating book: ${updateBookDto.title}`);
        }
    }

    remove(id: number) {
        const bookToDelete = this.findOne(id);

        if (!bookToDelete) {
            throw new NotFoundException('Book not found');
        }

        try {
            this.logger.log(`Deleting book ${bookToDelete.title}`);
            this.bookDbLibService.deleteBook(bookToDelete);
            this.logger.log(`Book ${bookToDelete.title} successfully deleted`);

            this.logger.log(`Deleting book-author relationship`);
            // If a book is deleted, also delete the book-author relationship
            this.bookAuthorService.removeBook(bookToDelete.id);
            this.logger.log(`Book-author relationship successfully deleted`);
        } catch (error) {
            this.logger.error(
                `Error deleting book: ${bookToDelete.title}`,
                error.stack,
            );
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

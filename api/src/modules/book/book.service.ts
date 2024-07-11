import {
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
            this.logger.log(`Book ${createBookDto.title} already exists`);
            return existingBook;
        }

        try {
            const newBook: BookDto = {
                id: this.generateId(),
                title: createBookDto.title,
                description: createBookDto.description,
                isbn: createBookDto.isbn,
            };

            this.bookDbLibService.createBook(newBook);

            if (createBookDto.authors.length > 0) {
                this.authorService.createBookAuthorRelationship(
                    newBook.id,
                    createBookDto.authors,
                );
            }

            return newBook;
        } catch (error) {
            this.logger.error(error);
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

                this.bookAuthorService.create(createdBook.id, authorId);
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

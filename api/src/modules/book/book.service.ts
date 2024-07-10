import {
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDbLibService } from 'src/lib/book-db-lib/book-db-lib.service';

@Injectable()
export class BookService {
    private readonly logger = new Logger(BookService.name);

    constructor(
        @Inject(forwardRef(() => BookDbLibService))
        private readonly bookDbLibService: BookDbLibService,
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

            this.bookDbLibService.createBook(newBook);
            return newBook;
        } catch (error) {
            this.logger.error(error);
            throw new Error(`Error creating book: ${createBookDto.title}`);
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

import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDbService } from 'src/lib/books-db-lib/books-db-lib.service';
import { Book } from 'src/types/book.types';
import { AuthorsService } from '../authors/authors.service';

/**
 * * Service for manipulating and transforming book data into its DTO
 * * Any database interaction should be done through the BooksDbService
 */
@Injectable()
export class BooksService {
    private logger = new Logger(BooksService.name);

    /**
     * Constructor for the BooksService class.
     *
     * @param {BooksDbService} booksDbService - The service for accessing the books database.
     * @param {AuthorsService} authorsService - The service for accessing the authors database.
     */
    constructor(
        private readonly booksDbService: BooksDbService,
        private readonly authorsService: AuthorsService,
    ) {}

    /**
     * Create a new book using the provided book data.
     *
     * @param {CreateBookDto} bookData - The data for the new book.
     * @return {void} No return value.
     */
    create(bookData: CreateBookDto): void {
        const existingBook = this.findByName(bookData.title);

        if (existingBook) {
            throw new ConflictException('Book already exists');
        }

        try {
            const newBookId = this.booksDbService.Books.length + 1;

            let newBook: Book = {
                id: this.booksDbService.Books.length + 1,
                ...bookData,
            };

            // Create the book author using author service
            for (const author of bookData.authors as string[]) {
                const newAuthor = this.authorsService.create({
                    name: author,
                    books: [newBookId],
                });

                // Set the author id on the book
                newBook = {
                    ...newBook,
                    authors: [newAuthor.id],
                };
            }

            this.logger.log('Creating Book:', newBook);
            this.booksDbService.createBook(newBook);
        } catch (error) {
            throw new Error(`Failed to create book ${bookData.title}`);
        }
    }

    update(id: number, bookData: UpdateBookDto): Book[] {
        const bookToUpdate: UpdateBookDto = this.findOne(id);

        if (!bookToUpdate) {
            throw new NotFoundException('Book not found');
        }

        try {
            const updatedBook = {
                ...bookToUpdate,
                ...bookData,
            };

            this.logger.log('Updating Book:', updatedBook);
            this.booksDbService.updateBook(updatedBook);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to update book ${bookData.title}`);
        }
    }

    remove(id: number): Book[] {
        const bookToRemove: Book = this.findOne(id);

        if (!bookToRemove) {
            throw new NotFoundException('Book not found');
        }

        try {
            this.logger.log('Removing Book:', bookToRemove);
            this.booksDbService.deleteBook(bookToRemove);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to delete book ${bookToRemove.title}`);
        }
    }

    findAll(): Book[] {
        return this.booksDbService.getAllBooks();
    }

    findOne(id: number): Book {
        const book: Book = this.booksDbService.getOneBookWithAuthorsId(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    findOneWithAuthorsName(id: number): Book {
        const book: Book = this.booksDbService.getOneBookWithAuthorsName(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    findByName(title: string): Book {
        this.logger.log('Finding book by name', title);

        const cleanTitle: string = title.trim().toLowerCase();

        return this.booksDbService.Books.find(
            (book) => book.title.toLowerCase() === cleanTitle,
        );
    }
}

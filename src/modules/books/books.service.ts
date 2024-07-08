import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDbService } from 'src/lib/books-db-lib/books-db-lib.service';
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
     * If the book has authors, they will should be created as well.
     *
     * @param {CreateBookDto} bookData - The data for the new book.
     * @return {void} No return value.
     */
    create(bookData: CreateBookDto): { message: string; book: CreateBookDto } {
        const existingBook = this.findByName(bookData.title);

        if (existingBook) {
            this.logger.log('Book already exists', existingBook);

            return {
                // Do not return ConflictException as it will
                // be used as a foreign key from authors service
                message: 'Book already exists',
                book: existingBook,
            };
        }

        try {
            /**
             * Get the latest book id and increment it by 1
             * So that if we ever delete a book, generating new id will just continue from there
             */
            const latestId: number =
                this.booksDbService.Books[this.booksDbService.Books.length - 1]
                    .id;

            const newBook: CreateBookDto = {
                id: latestId + 1,
                ...bookData,
                authors: [],
            };

            // Create the book author using author service
            for (const author of bookData.authors) {
                const newAuthor = this.authorsService.create({
                    name: author.toString(),
                    books: [newBook.id],
                });

                // Set the author id on the book
                newBook.authors.push(newAuthor.id);
            }

            this.booksDbService.createBook(newBook);
            this.logger.log(`${newBook.title} has been successfully created.`);

            return {
                message: `${newBook.title} has been successfully created.`,
                book: newBook,
            };
        } catch (error) {
            throw new Error(`Failed to create book ${bookData.title}`);
        }
    }

    update(id: number, bookData: UpdateBookDto): string {
        const bookToUpdate: UpdateBookDto = this.findOne(id);

        if (!bookToUpdate) {
            throw new NotFoundException('Book not found');
        }

        try {
            const updatedBook = {
                ...bookToUpdate,
                ...bookData,
            };

            this.booksDbService.updateBook(updatedBook);

            return `${bookToUpdate.title} has been successfully updated.`;
        } catch (error) {
            throw new Error(`Failed to update book ${bookData.title}`);
        }
    }

    remove(id: number): string {
        const bookToRemove: CreateBookDto = this.findOne(id);

        if (!bookToRemove) {
            throw new NotFoundException('Book not found');
        }

        try {
            this.booksDbService.deleteBook(bookToRemove);

            return `${bookToRemove.title} has been successfully deleted.`;
        } catch (error) {
            throw new Error(`Failed to delete book ${bookToRemove.title}`);
        }
    }

    findAll() {
        return this.booksDbService.getAllBooks();
    }

    findOne(id: number): CreateBookDto {
        const book: CreateBookDto =
            this.booksDbService.getOneBookWithAuthorsId(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    findOneWithAuthorsName(id: number): CreateBookDto {
        const book: CreateBookDto =
            this.booksDbService.getOneBookWithAuthorsName(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    findByName(title: string): CreateBookDto {
        this.logger.log('Finding book by name', title);

        const cleanTitle: string = title.trim().toLowerCase();

        return this.booksDbService.Books.find(
            (book: CreateBookDto) => book.title.toLowerCase() === cleanTitle,
        );
    }
}

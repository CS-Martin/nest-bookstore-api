import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDbService } from 'src/lib/books-db-lib/books-db-lib.service';
import { AuthorsService } from '../authors/authors.service';

/**
 * Service for manipulating and transforming book data into its DTO
 * Any database interaction should be done through the BooksDbService
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
     * @return {CreateBookDto} The created book.
     */
    create(bookData: CreateBookDto): CreateBookDto {
        console.log(bookData);
        const existingBook = this.findByName(bookData.title);

        if (existingBook) {
            this.logger.log('Book already exists', existingBook);
            return existingBook;
        }

        try {
            const newBook: CreateBookDto = {
                id: this.getNextBookId(),
                ...bookData,
                authors: [],
            };

            // Create authors for the new book if any
            if (bookData.authors.length > 0) {
                newBook.authors = bookData.authors.map((author) => {
                    /**
                     * createAuthorForBooks returns the created author
                     * so we can get the id of the created author
                     * and push it to newBook.authors as foreign key
                     */
                    const newAuthor = this.authorsService.createAuthorForBooks(
                        author.toString(),
                        newBook.id,
                    );
                    return newAuthor.id;
                });
            }

            this.booksDbService.createBook(newBook);
            this.logger.log(`${newBook.title} has been successfully created.`);

            return newBook;
        } catch (error) {
            this.logger.error(`Failed to create book ${bookData}`, error);
            throw new Error(`Failed to create book ${bookData.title}`);
        }
    }

    /**
     * Create books for a given author.
     *
     * @param {number} authorId - The ID of the author.
     * @param {string[]} bookTitles - The titles of the books to create.
     */
    createBooksForAuthor(authorId: number, bookTitles: string): CreateBookDto {
        const newBook: CreateBookDto = {
            id: this.getNextBookId(),
            title: bookTitles,
            authors: [authorId],
        };
        this.booksDbService.createBook(newBook);

        return newBook;
    }

    /**
     * Update an existing book with the provided data.
     *
     * @param {number} id - The ID of the book to update.
     * @param {UpdateBookDto} bookData - The updated book data.
     * @return {string} A success message.
     */
    update(id: number, bookData: UpdateBookDto): string {
        const bookToUpdate = this.findOne(id);
        if (!bookToUpdate) {
            throw new NotFoundException('Book not found');
        }

        try {
            const updatedBook = { ...bookToUpdate, ...bookData };
            this.booksDbService.updateBook(updatedBook);
            return `${bookToUpdate.title} has been successfully updated.`;
        } catch (error) {
            throw new Error(`Failed to update book ${bookData.title}`);
        }
    }

    /**
     * Remove a book from the database.
     *
     * @param {number} id - The ID of the book to remove.
     * @return {string} A success message.
     */
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

    /**
     * Get all books from the database.
     *
     * @return {CreateBookDto[]} An array of all books.
     */
    findAll(): CreateBookDto[] {
        return this.booksDbService.getAllBooks();
    }

    /**
     * Get a single book by its ID.
     *
     * @param {number} id - The ID of the book to retrieve.
     * @return {CreateBookDto} The requested book.
     */
    findOne(id: number): CreateBookDto {
        const book: CreateBookDto =
            this.booksDbService.getOneBookWithAuthorsId(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    /**
     * Get a single book by its ID, including author names.
     *
     * @param {number} id - The ID of the book to retrieve.
     * @return {CreateBookDto} The requested book with author names.
     */
    findOneWithAuthorsName(id: number): CreateBookDto {
        const book = this.booksDbService.getOneBookWithAuthorsName(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    /**
     * Find a book by its title.
     *
     * @param {string} title - The title of the book to find.
     * @return {CreateBookDto} The found book, or undefined if not found.
     */
    findByName(title: string): CreateBookDto {
        this.logger.log('Finding book by name', title);
        const cleanTitle = title.trim().toLowerCase();
        return this.booksDbService.Books.find(
            (book: CreateBookDto) => book.title.toLowerCase() === cleanTitle,
        );
    }

    /**
     * Get the next available book ID.
     *
     * @return {number} The next available book ID.
     */
    private getNextBookId(): number {
        const booksArrayLength = this.booksDbService.Books.length;
        return booksArrayLength > 0 ? booksArrayLength + 1 : 0;
    }
}

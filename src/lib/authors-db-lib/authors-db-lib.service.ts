import { loadData } from '../utils';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthorDto } from 'src/modules/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/modules/authors/dto/update-author.dto';
import { BooksService } from 'src/modules/books/books.service';
import { BooksDbService } from '../books-db-lib/books-db-lib.service';

@Injectable()
export class AuthorsDbService {
    private logger = new Logger(AuthorsDbService.name);
    public Authors = loadData().authors;

    constructor(
        @Inject(forwardRef(() => BooksService))
        private readonly booksService: BooksService,
        @Inject(forwardRef(() => BooksDbService))
        private readonly booksDbService: BooksDbService,
    ) {}

    createAuthor(newAuthor: CreateAuthorDto) {
        this.logger.log('Creating author:', newAuthor);

        this.Authors.push(newAuthor);
    }

    updateAuthor(authorToUpdate: UpdateAuthorDto) {
        this.logger.log('Updating author:', authorToUpdate);

        this.Authors = this.Authors.map((author) => {
            if (author.id === authorToUpdate.id) {
                return { ...author, ...authorToUpdate };
            }
            return author;
        });
    }

    deleteAuthor(authorToDelete: CreateAuthorDto) {
        this.logger.log('Deleting author:', authorToDelete);

        this.Authors = this.Authors.filter(
            (author: CreateAuthorDto) => author.id !== authorToDelete.id,
        );

        /**
         * If delete a author, delete its referencing id in books too
         */
        for (const book of authorToDelete.books) {
            this.booksDbService.removeAuthorFromBook(
                Number(book),
                authorToDelete.id,
            );
        }
    }

    getAllAuthors() {
        return this.Authors.map((author) => {
            this.logger.log('Author:', author);

            const books = author.books.map(
                (bookId: number) => this.booksService.findOne(bookId).title,
            );

            return { ...author, books };
        });
    }

    /**
     * Retrieves an author with the specified ID from the list of authors.
     *
     * @param {number} id - The ID of the author to retrieve.
     * @return {Author | undefined} The author with the specified ID, or undefined if not found.
     */
    getAuthorWithBooksId(id: number) {
        return this.Authors.find((author) => author.id === id);
    }

    /**
     * Finds an author with the given id and retrieves the titles of their associated books.
     *
     * @param {number} id - The id of the author to search for
     */
    getAuthorWithBooksName(id: number) {
        const author = this.Authors.find((author) => author.id === id);

        if (author) {
            const books = author.books.map(
                (bookId) => this.booksService.findOne(bookId).title,
            );

            return { ...author, books };
        }
    }

    /**
     * Removes a book from the author's list of books.
     * This function is used when deleting a book.
     * Had to remove its own id from the author's list of books to avoid foreign key issues.
     *
     * @param {number} authorId - The ID of the author
     * @param {number} bookId - The ID of the book to be removed
     */
    removeBookFromAuthor(authorId: number, bookId: number) {
        this.logger.log('Removing book:', bookId, 'from author:', authorId);

        const author = this.getAuthorWithBooksId(authorId);

        // Remove the book from the author
        if (author) {
            author.books = author.books.filter((book) => book !== bookId);
        }
    }
}

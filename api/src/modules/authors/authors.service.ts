import {
    forwardRef,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDbService } from 'src/lib/authors-db-lib/authors-db-lib.service';
import { BooksService } from '../books/books.service';

@Injectable()
export class AuthorsService {
    private logger = new Logger(AuthorsService.name);

    constructor(
        @Inject(forwardRef(() => AuthorsDbService))
        private readonly authorsDbService: AuthorsDbService,
        @Inject(forwardRef(() => BooksService))
        private readonly booksService: BooksService,
    ) {}

    /**
     * Creates a new author.
     * If the author already exists, it returns the existing author.
     * Otherwise, it creates a new author.
     *
     * @param {CreateAuthorDto} authorData - The data for the new author.
     * @returns {CreateAuthorDto} The created author.
     */
    create(authorData: CreateAuthorDto): CreateAuthorDto {
        const existingAuthor = this.findByName(authorData.name);

        if (existingAuthor) {
            this.logger.log('Author already exists:', existingAuthor);
            return existingAuthor;
        }

        try {
            const latestId = this.getLatestAuthorId();
            const newAuthor = { id: latestId + 1, ...authorData };

            /**
             * TODO: If author has books, create new books entity
             */

            this.authorsDbService.createAuthor(newAuthor);

            return newAuthor;
        } catch (error) {
            throw new Error(`Failed to create author ${authorData.name}`);
        }
    }

    /**
     * Updates an existing author.
     *
     * @param {number} id - The ID of the author to update.
     * @param {UpdateAuthorDto} updateAuthorDto - The new data for the author.
     * @returns {CreateAuthorDto[]} An array of all authors.
     */
    update(id: number, updateAuthorDto: UpdateAuthorDto): CreateAuthorDto[] {
        const authorToUpdate = this.findOne(id);

        if (!authorToUpdate) {
            throw new NotFoundException('Author not found');
        }

        try {
            const updatedAuthor = { ...authorToUpdate, ...updateAuthorDto };
            this.authorsDbService.updateAuthor(updatedAuthor);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to update author ${updateAuthorDto.name}`);
        }
    }

    /**
     * Removes an author by its ID.
     *
     * @param {number} id - The ID of the author to remove.
     * @returns {CreateAuthorDto[]} An array of all authors.
     */
    remove(id: number): CreateAuthorDto[] {
        const authorToRemove = this.findOne(id);

        if (!authorToRemove) {
            throw new NotFoundException('Author not found');
        }

        try {
            this.authorsDbService.deleteAuthor(authorToRemove);
            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to remove author ${authorToRemove.name}`);
        }
    }

    /**
     * Retrieves all authors.
     *
     * @returns {CreateAuthorDto[]} An array of all authors.
     */
    findAll(): CreateAuthorDto[] {
        return this.authorsDbService.getAllAuthors();
    }

    /**
     * Retrieves an author by its ID.
     *
     * @param {number} id - The ID of the author to retrieve.
     * @returns {CreateAuthorDto} The retrieved author.
     */
    findOne(id: number): CreateAuthorDto {
        const author = this.authorsDbService.getAuthorWithBooksId(id);

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        return author;
    }

    findOneWithBooksName(id: number) {
        const author = this.authorsDbService.getAuthorWithBooksName(id);
        if (!author) {
            throw new NotFoundException('Author not found');
        }
        return author;
    }

    findByName(name: string) {
        this.logger.log('Finding author by name', name);

        const cleanName = name.trim().toLowerCase();

        return this.authorsDbService.Authors.find(
            (author) => author.name.toLowerCase() === cleanName,
        );
    }

    /**
     * Retrieves the latest author ID.
     *
     * @returns {number} The latest author ID.
     */
    private getLatestAuthorId(): number {
        const authorsArrayLength = this.authorsDbService.Authors.length;
        return authorsArrayLength > 0
            ? this.authorsDbService.Authors[authorsArrayLength - 1].id
            : 0;
    }
}

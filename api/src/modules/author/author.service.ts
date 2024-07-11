import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorDbLibService } from 'src/lib/db/author-db-lib.service';
import { BookAuthorService } from '../book-author/book-author.service';
import { BookService } from '../book/book.service';

@Injectable()
export class AuthorService {
    private logger = new Logger(AuthorService.name);

    constructor(
        @Inject(forwardRef(() => AuthorDbLibService))
        private authorDbLibService: AuthorDbLibService,
        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
        @Inject(forwardRef(() => BookAuthorService))
        private bookAuthorService: BookAuthorService,
    ) {}

    create(createAuthorDto: CreateAuthorDto) {
        const existingAuthor = this.authorDbLibService.getAuthorByName(
            createAuthorDto.name,
        );

        if (existingAuthor) {
            throw new ConflictException(
                `Author ${createAuthorDto.name} already exists`,
            );
        }

        try {
            const newAuthor = {
                id: this.generateAuthorId(),
                name: createAuthorDto.name,
            };

            this.logger.log(`Creating author ${newAuthor.name}`);
            this.authorDbLibService.createAuthor(newAuthor);
            this.logger.log(`Author ${newAuthor.name} created`);

            if (createAuthorDto.books) {
                this.bookService.createBookAuthorRelationship(
                    newAuthor.id,
                    createAuthorDto.books,
                );
            }

            return {
                message: 'Author created successfully',
                newAuthor,
            };
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error creating author');
        }
    }

    createBookAuthorRelationship(bookId: number, newAuthor: string[]) {
        try {
            newAuthor.forEach((author) => {
                const createdAuthor = this.create({
                    name: author,
                    books: [],
                });

                this.logger.log(`Creating book-author relationship`);
                this.bookAuthorService.create(
                    bookId,
                    createdAuthor.newAuthor.id,
                );
            });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(
                `Error creating author ${newAuthor}`,
            );
        }
    }

    update(id: number, updateAuthorDto: UpdateAuthorDto) {
        const existingAuthor = this.findOne(id);

        if (!existingAuthor) {
            throw new NotFoundException('Author not found');
        }

        try {
            const updatedAuthor = {
                ...existingAuthor,
                ...updateAuthorDto,
            };

            this.logger.log(`Updating author ${updatedAuthor.name}`);
            this.authorDbLibService.updateAuthor(updatedAuthor);
            this.logger.log(
                `Author ${updatedAuthor.name} successfully updated`,
            );

            return {
                message: 'Author updated successfully',
                updatedAuthor,
            };
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error updating author');
        }
    }

    remove(id: number) {
        const existingAuthor = this.findOne(id);

        if (!existingAuthor) {
            throw new NotFoundException('Author not found');
        }

        try {
            this.authorDbLibService.deleteAuthor(existingAuthor);

            // If an author is deleted, also delete the book-author relationship
            this.logger.log(`Deleting book-author relationship`);
            this.bookAuthorService.removeAuthor(existingAuthor.id);
            this.logger.log(
                `Author ${existingAuthor.name} successfully deleted`,
            );

            return {
                message: 'Author deleted successfully',
                existingAuthor,
            };
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error deleting author');
        }
    }

    findAll() {
        return this.authorDbLibService.getAllAuthors();
    }

    findOne(id: number) {
        const existingAuthor = this.authorDbLibService.getAuthor(id);

        if (!existingAuthor) {
            throw new NotFoundException('Author not found');
        }

        return existingAuthor;
    }

    private generateAuthorId(): number {
        const authorsArrayLength =
            this.authorDbLibService.getAuthorsArrayLength();
        return authorsArrayLength > 0 ? authorsArrayLength + 1 : 1;
    }
}

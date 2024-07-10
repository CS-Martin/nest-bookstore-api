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
            throw new ConflictException('Author already exists');
        }

        try {
            const newAuthor = {
                id: this.generateAuthorId(),
                ...createAuthorDto,
            };

            this.authorDbLibService.createAuthor(newAuthor);

            if (newAuthor.books.length > 0) {
                newAuthor.books.forEach((book) => {
                    this.bookService.createBookAuthorRelationship(
                        newAuthor.id,
                        book,
                    );
                });
            }

            return newAuthor;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error creating author');
        }
    }

    createBookAuthorRelationship(bookId: number, newAuthor: string) {
        try {
            const createdAuthor: CreateAuthorDto = this.create({
                name: newAuthor,
            });

            this.bookAuthorService.create({
                bookId,
                authorId: createdAuthor.id,
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

            this.authorDbLibService.updateAuthor(updatedAuthor);
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

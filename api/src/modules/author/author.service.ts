import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { AuthorDto, CreateAuthorDto } from './dto/create-author.dto';
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
            this.logger.log(`Author ${createAuthorDto.name} already exists`);
            return existingAuthor;
        }

        try {
            const newAuthor = {
                id: this.generateAuthorId(),
                name: createAuthorDto.name,
            };

            this.authorDbLibService.createAuthor(newAuthor);

            if (createAuthorDto.books) {
                this.bookService.createBookAuthorRelationship(
                    newAuthor.id,
                    createAuthorDto.books,
                );
            }

            return newAuthor;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error creating author');
        }
    }

    createBookAuthorRelationship(bookId: number, newAuthor: string[]) {
        try {
            newAuthor.forEach((author) => {
                const createdAuthor: AuthorDto = this.create({
                    name: author,
                    books: [],
                });

                console.log('check', createdAuthor);

                this.bookAuthorService.create(bookId, createdAuthor.id);
            });

            console.log(this.findAll());
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

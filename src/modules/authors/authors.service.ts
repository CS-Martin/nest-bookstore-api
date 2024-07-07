import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDbService } from 'src/lib/authors-db-lib/authors-db-lib.service';
import { Author } from 'src/types/author.types';

@Injectable()
export class AuthorsService {
    private logger = new Logger(AuthorsService.name);
    constructor(private readonly authorsDbService: AuthorsDbService) {}

    create(authorData: CreateAuthorDto) {
        const existingAuthor = this.findByName(authorData.name);

        /**
         * Some books already has existing author
         * So we can't create new author
         * We can only return the existing author
         * For the book to get its authorId and use it as reference
         */
        if (existingAuthor) {
            return existingAuthor;
        }

        try {
            const newAuthor = {
                id: this.authorsDbService.Authors.length + 1,
                ...authorData,
            };

            this.logger.log('Creating Author:', newAuthor);
            this.authorsDbService.createAuthor(newAuthor);

            return newAuthor;
        } catch (error) {
            this.logger.error(
                `Failed to create author ${authorData.name}`,
                error.stack,
            );
            throw new Error(`Failed to create author ${authorData.name}`);
        }
    }

    update(id: number, updateAuthorDto: UpdateAuthorDto) {
        let authorToUpdate: UpdateAuthorDto = this.findOne(id);

        if (!authorToUpdate) {
            throw new NotFoundException('Author not found');
        }

        try {
            authorToUpdate = { ...authorToUpdate, ...updateAuthorDto };

            this.logger.log('Updating Author:', authorToUpdate);
            this.authorsDbService.updateAuthor(authorToUpdate);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to update author ${updateAuthorDto.name}`);
        }
    }

    remove(id: number) {
        const authorToRemove = this.findOne(id);

        if (!authorToRemove) {
            throw new NotFoundException('Author not found');
        }

        try {
            this.logger.log('Removing Author:', authorToRemove);

            this.authorsDbService.deleteAuthor(authorToRemove);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to remove author ${authorToRemove.name}`);
        }
    }

    findAll() {
        return this.authorsDbService.getAllAuthors();
    }

    findOne(id: number): Author {
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

    findByName(name: string): Author {
        this.logger.log('Finding author by name', name);

        const cleanName = name.trim().toLowerCase();

        return this.authorsDbService.Authors.find(
            (author) => author.name.toLowerCase() === cleanName,
        );
    }
}

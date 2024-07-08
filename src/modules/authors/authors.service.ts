import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDbService } from 'src/lib/authors-db-lib/authors-db-lib.service';

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
         * For the book to get its authorId and use it as a foreign key
         */
        if (existingAuthor) {
            return existingAuthor;
        }

        try {
            /**
             * Get the latest book id and increment it by 1
             * So that if we ever delete a book, id will just continue from latest id
             */
            const latestId =
                this.authorsDbService.Authors[
                    this.authorsDbService.Authors.length - 1
                ].id;

            const newAuthor = {
                id: latestId + 1,
                ...authorData,
            };

            this.authorsDbService.createAuthor(newAuthor);

            // Return the new author with for books service to use the id as a foreign key
            return newAuthor;
        } catch (error) {
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
            this.authorsDbService.deleteAuthor(authorToRemove);

            return this.findAll();
        } catch (error) {
            throw new Error(`Failed to remove author ${authorToRemove.name}`);
        }
    }

    findAll() {
        return this.authorsDbService.getAllAuthors();
    }

    findOne(id: number) {
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
}

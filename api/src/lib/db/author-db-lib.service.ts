import { AuthorDto } from 'src/modules/author/dto/create-author.dto';
import { loadAuthors } from '../utils';

import { Logger } from '@nestjs/common';

export class AuthorDbLibService {
    private logger = new Logger(AuthorDbLibService.name);
    private AuthorsArray: AuthorDto[] = loadAuthors();

    createAuthor(createAuthorDto: AuthorDto): void {
        this.AuthorsArray.push(createAuthorDto);
    }

    updateAuthor(authorToUpdate: AuthorDto): void {
        const authorIndex = authorToUpdate.id;

        this.AuthorsArray[authorIndex - 1] = authorToUpdate;
    }

    deleteAuthor(authorToDelete: AuthorDto): void {
        const authorIndex = authorToDelete.id;

        this.AuthorsArray.splice(authorIndex - 1, 1);
    }

    getAllAuthors(): AuthorDto[] {
        this.logger.log(`Getting all authors: ${this.AuthorsArray}`);
        return this.AuthorsArray;
    }

    getAuthor(id: number): AuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.id === id);
    }

    getAuthorByName(name: string): AuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.name === name);
    }

    getAuthorsArrayLength(): number {
        return this.AuthorsArray.length;
    }
}

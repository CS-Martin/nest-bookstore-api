import { AuthorDto } from 'src/modules/author/dto/author.dto';
import { loadAuthors } from '../utils';

export class AuthorDbLibService {
    private AuthorsArray: AuthorDto[] = loadAuthors();

    createAuthor(createAuthorDto: AuthorDto): void {
        this.AuthorsArray.push(createAuthorDto);
    }

    updateAuthor(authorToUpdate: AuthorDto): void {
        const authorIndex = this.AuthorsArray.findIndex(
            (author) => author.id === authorToUpdate.id,
        );

        if (authorIndex !== -1) {
            this.AuthorsArray[authorIndex] = authorToUpdate;
        }
    }

    deleteAuthor(authorToDelete: AuthorDto): void {
        const authorIndex = this.AuthorsArray.findIndex(
            (author) => author.id === authorToDelete.id,
        );

        this.AuthorsArray.splice(authorIndex - 1, 1);
    }

    getAllAuthors(): AuthorDto[] {
        return this.AuthorsArray;
    }

    getAuthor(id: string): AuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.id === id);
    }

    getAuthorByName(name: string): AuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.name === name);
    }

    getAuthorsArrayLength(): number {
        return this.AuthorsArray.length;
    }
}

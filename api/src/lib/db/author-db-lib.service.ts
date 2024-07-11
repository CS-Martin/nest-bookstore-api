import { AuthorDto } from 'src/modules/author/dto/create-author.dto';
import { loadAuthors } from '../utils';

export class AuthorDbLibService {
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

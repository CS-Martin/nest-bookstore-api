import { CreateAuthorDto } from 'src/modules/author/dto/create-author.dto';
import { loadAuthors } from '../utils';

export class AuthorDbLibService {
    private AuthorsArray: CreateAuthorDto[] = loadAuthors();

    createAuthor(createAuthorDto: CreateAuthorDto): void {
        this.AuthorsArray.push(createAuthorDto);
    }

    updateAuthor(authorToUpdate: CreateAuthorDto): void {
        const authorIndex = authorToUpdate.id;

        this.AuthorsArray[authorIndex - 1] = authorToUpdate;
    }

    deleteAuthor(authorToDelete: CreateAuthorDto): void {
        const authorIndex = authorToDelete.id;

        this.AuthorsArray.splice(authorIndex - 1, 1);
    }

    getAllAuthors(): CreateAuthorDto[] {
        return this.AuthorsArray;
    }

    getAuthor(id: number): CreateAuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.id === id);
    }

    getAuthorByName(name: string): CreateAuthorDto | undefined {
        return this.AuthorsArray.find((author) => author.name === name);
    }

    getAuthorsArrayLength(): number {
        return this.AuthorsArray.length;
    }
}

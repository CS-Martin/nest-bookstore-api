import { CreateAuthorDto } from 'src/modules/author/dto/create-author.dto';
import { loadAuthors } from '../utils';

export class AuthorDbLibService {
    private AuthorsArray: CreateAuthorDto[] = loadAuthors();

    createAuthor(createAuthorDto: CreateAuthorDto) {
        this.AuthorsArray.push(createAuthorDto);
    }

    updateAuthor(authorToUpdate: CreateAuthorDto) {
        const authorIndex = authorToUpdate.id;

        this.AuthorsArray[authorIndex - 1] = authorToUpdate;
    }

    deleteAuthor(authorToDelete: CreateAuthorDto) {
        const authorIndex = authorToDelete.id;

        this.AuthorsArray.splice(authorIndex - 1, 1);
    }

    getAllAuthors() {
        return this.AuthorsArray;
    }

    getAuthor(id: number) {
        return this.AuthorsArray.find((author) => author.id === id);
    }
}

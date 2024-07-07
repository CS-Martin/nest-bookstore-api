import { Author } from 'src/types/author.types';
import { loadData } from '../utils';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/modules/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/modules/authors/dto/update-author.dto';
import { BooksService } from 'src/modules/books/books.service';

@Injectable()
export class AuthorsDbService {
    public Authors: Author[] = loadData().authors;

    constructor(
        @Inject(forwardRef(() => BooksService))
        private readonly booksService: BooksService,
    ) {}

    createAuthor(newAuthor: CreateAuthorDto) {
        this.Authors.push(newAuthor);
        console.log('Current Authors:', this.Authors);
    }

    updateAuthor(authorToUpdate: UpdateAuthorDto) {
        this.Authors = this.Authors.map((author) => {
            if (author.id === authorToUpdate.id) {
                return { ...author, ...authorToUpdate };
            }
            return author;
        });
    }

    deleteAuthor(authorToDelete: Author) {
        this.Authors = this.Authors.filter(
            (author) => author.id !== authorToDelete.id,
        );
    }

    getAllAuthors() {
        return this.Authors.map((author) => {
            const books = author.books.map(
                (bookId) => this.booksService.findOne(bookId).title,
            );
            return { ...author, books };
        });
    }

    getAuthorWithBooksId(id: number) {
        return this.Authors.find((author) => author.id === id);
    }

    getAuthorWithBooksName(id: number) {
        const author = this.Authors.find((author) => author.id === id);
        if (author) {
            const books = author.books.map(
                (bookId) => this.booksService.findOne(bookId).title,
            );
            return { ...author, books };
        }
    }
}

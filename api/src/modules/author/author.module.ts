import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorDbLibService } from 'src/lib/db/author-db-lib.service';
import { BookAuthorService } from '../book-author/book-author.service';
import { BookService } from '../book/book.service';

@Module({
    controllers: [AuthorController],
    providers: [
        AuthorService,
        AuthorDbLibService,
        BookAuthorService,
        BookService,
    ],
})
export class AuthorModule {}

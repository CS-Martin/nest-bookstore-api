import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookDbLibService } from 'src/lib/db/book-db-lib.service';
import { BookAuthorService } from '../book-author/book-author.service';
import { AuthorService } from '../author/author.service';

@Module({
    controllers: [BookController],
    providers: [
        BookService,
        BookDbLibService,
        BookAuthorService,
        AuthorService,
    ],
})
export class BookModule {}

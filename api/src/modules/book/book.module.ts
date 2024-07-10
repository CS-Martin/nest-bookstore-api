import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookDbLibService } from 'src/lib/book-db-lib/book-db-lib.service';

@Module({
    controllers: [BookController],
    providers: [BookService, BookDbLibService],
})
export class BookModule {}

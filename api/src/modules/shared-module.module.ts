import { forwardRef, Module } from '@nestjs/common';
import { BooksDbService } from '../lib/books-db-lib/books-db-lib.service';
import { AuthorsDbService } from '../lib/authors-db-lib/authors-db-lib.service';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
    imports: [forwardRef(() => BooksModule), forwardRef(() => AuthorsModule)],
    providers: [BooksService, BooksDbService, AuthorsService, AuthorsDbService],
    exports: [BooksService, BooksDbService, AuthorsService, AuthorsDbService],
})
export class SharedModule {}

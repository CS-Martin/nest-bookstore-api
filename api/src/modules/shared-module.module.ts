import { Module, forwardRef } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { BookService } from './book/book.service';
import { BookDbLibService } from 'src/lib/db/book-db-lib.service';
import { AuthorService } from './author/author.service';
import { AuthorDbLibService } from 'src/lib/db/author-db-lib.service';
import { BookAuthorModule } from './book-author/book-author.module';
import { BookAuthorService } from './book-author/book-author.service';
import { BookAuthorDbLibService } from 'src/lib/db/book-author-db-lib.service';

@Module({
    imports: [
        forwardRef(() => BookModule),
        forwardRef(() => AuthorModule),
        forwardRef(() => BookAuthorModule),
    ],
    providers: [
        BookService,
        BookDbLibService,
        AuthorService,
        AuthorDbLibService,
        BookAuthorService,
        BookAuthorDbLibService,
    ],
    exports: [
        BookService,
        BookDbLibService,
        AuthorService,
        AuthorDbLibService,
        BookAuthorService,
        BookAuthorDbLibService,
    ],
})
export class SharedModule {}

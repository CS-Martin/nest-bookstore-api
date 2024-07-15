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
import { BookPrismaLibService } from 'src/lib/prisma/book-prisma-lib.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorPrismaLibService } from 'src/lib/prisma/author-prisma-lib.service';

@Module({
    imports: [
        forwardRef(() => BookModule),
        forwardRef(() => AuthorModule),
        forwardRef(() => BookAuthorModule),
    ],
    providers: [
        BookService,
        BookDbLibService,
        BookAuthorService,
        BookAuthorDbLibService,
        BookPrismaLibService,

        AuthorService,
        AuthorDbLibService,
        AuthorPrismaLibService,

        PrismaService,
    ],
    exports: [
        BookService,
        BookDbLibService,
        BookAuthorService,
        BookAuthorDbLibService,

        AuthorService,
        AuthorDbLibService,
    ],
})
export class SharedModule {}

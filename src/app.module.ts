import { Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { SharedModule } from './modules/shared-module.module';

@Module({
    imports: [BooksModule, AuthorsModule, SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

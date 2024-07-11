import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SharedModule } from '../shared-module.module';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService],

    // imports: [forwardRef(() => AuthorModule)],
    // controllers: [BookController],
    // providers: [
    //     BookService,
    //     BookDbLibService,
    //     BookAuthorService,
    //     AuthorService,
    //     AuthorDbLibService,
    // ],
})
export class BookModule {}

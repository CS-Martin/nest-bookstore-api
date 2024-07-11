import { Module, forwardRef } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { SharedModule } from '../shared-module.module';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [AuthorService],

    // imports: [forwardRef(() => BookModule)],
    // controllers: [AuthorController],
    // providers: [
    //     AuthorService,
    //     AuthorDbLibService,
    //     BookAuthorService,
    //     BookService,
    //     BookDbLibService,
    // ],
})
export class AuthorModule {}

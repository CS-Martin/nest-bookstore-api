import { Module, forwardRef } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';
import { BookAuthorController } from './book-author.controller';
import { SharedModule } from '../shared-module.module';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [BookAuthorController],
    providers: [BookAuthorService],
    exports: [BookAuthorService],
})
export class BookAuthorModule {}

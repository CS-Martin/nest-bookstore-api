import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { SharedModule } from '../shared-module.module';
import { BooksService } from './books.service';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService],
})
export class BooksModule {}

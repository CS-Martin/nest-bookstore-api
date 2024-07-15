import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SharedModule } from '../shared-module.module';
import { BookPrismaLibService } from 'src/lib/prisma/book-prisma-lib.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [BookController],
    providers: [BookService, BookPrismaLibService, PrismaService],
    exports: [BookService],
})
export class BookModule {}

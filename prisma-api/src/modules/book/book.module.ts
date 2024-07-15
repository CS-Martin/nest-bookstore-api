import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookPrismaLibService } from 'src/lib/prisma/book-prisma-lib.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [BookController],
    providers: [BookService, BookPrismaLibService, PrismaService],
})
export class BookModule {}

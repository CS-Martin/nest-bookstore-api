import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BookDto } from 'src/modules/book/dto/book.dto';
import { CreateBookDto } from 'src/modules/book/dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookPrismaLibService {
    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {}

    async createBook(bookData: CreateBookDto): Promise<BookDto> {
        console.log(bookData);
        const { title, description, isbn, authors } = bookData;

        const createdBook = await this.prisma.book.create({
            data: {
                title,
                description,
                isbn,
                authors,
            },
        });

        return createdBook;
    }
}

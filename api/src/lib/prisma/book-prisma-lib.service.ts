import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BookPrismaDto } from 'src/modules/book/dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookPrismaLibService {
    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {}

    async createBook(bookData: BookPrismaDto) {
        await this.prisma.book.create({
            data: {
                title: bookData.title,
                description: bookData.description,
                isbn: bookData.isbn,
            },
        });
    }
}

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BookDto } from 'src/modules/book/dto/book.dto';
import { CreateBookDto } from 'src/modules/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/modules/book/dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookPrismaLibService {
    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {}

    async createBook(bookData: CreateBookDto): Promise<BookDto> {
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

    async updateBook(
        id: string,
        bookToUpdate: UpdateBookDto,
    ): Promise<BookDto> {
        const { title, description, isbn, authors } = bookToUpdate;

        const updatedBook = await this.prisma.book.update({
            where: { id },
            data: {
                title,
                description,
                isbn,
                authors,
            },
        });

        return updatedBook;
    }

    async deleteBook(id: string): Promise<BookDto> {
        const deletedBook = await this.prisma.book.delete({
            where: { id },
        });

        return deletedBook;
    }

    async getBooks(): Promise<BookDto[]> {
        const books = await this.prisma.book.findMany();
        return books;
    }

    async getBook(id: string): Promise<BookDto | null> {
        const book = await this.prisma.book.findUnique({ where: { id } });
        return book;
    }

    async getBookByTitle(title: string): Promise<BookDto | null> {
        const book = await this.prisma.book.findFirst({ where: { title } });
        return book;
    }
}

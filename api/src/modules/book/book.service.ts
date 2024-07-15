import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookPrismaLibService } from 'src/lib/prisma/book-prisma-lib.service';

@Injectable()
export class BookService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bookPrismaLibService: BookPrismaLibService,
    ) {}

    async create(createBookDto: CreateBookDto) {
        try {
            const book =
                await this.bookPrismaLibService.createBook(createBookDto);
            return book;
        } catch (error) {
            throw new Error(error);
        }
    }

    findAll() {
        return `This action returns all book`;
    }

    findOne(id: number) {
        return `This action returns a #${id} book`;
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        return `This action updates a #${id} book`;
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}

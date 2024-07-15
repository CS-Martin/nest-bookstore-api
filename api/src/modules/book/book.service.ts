import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookPrismaLibService } from 'src/lib/prisma/book-prisma-lib.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    private logger = new Logger(BookService.name);

    constructor(private readonly bookPrismaLibService: BookPrismaLibService) {}

    async create(createBookDto: CreateBookDto): Promise<BookDto> {
        const existingBook = await this.bookPrismaLibService.getBookByTitle(
            createBookDto.title,
        );

        if (existingBook) {
            throw new ConflictException('Book already exists');
        }

        try {
            const book =
                await this.bookPrismaLibService.createBook(createBookDto);
            return book;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDto> {
        try {
            const book = await this.bookPrismaLibService.updateBook(
                id,
                updateBookDto,
            );
            return book;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string): Promise<BookDto> {
        const book = await this.bookPrismaLibService.getBook(id);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        try {
            const book = await this.bookPrismaLibService.deleteBook(id);

            return book;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<BookDto[]> {
        const books = await this.bookPrismaLibService.getBooks();
        return books;
    }

    async findOne(id: string): Promise<BookDto> {
        try {
            const book = await this.bookPrismaLibService.getBook(id);

            if (!book) {
                throw new NotFoundException('Book not found');
            }

            return book;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}

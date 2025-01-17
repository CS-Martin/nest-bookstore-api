import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ParseIntPipe,
    UseFilters,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filters';

@UseFilters(HttpExceptionFilter)
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        return this.bookService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
    ) {
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number) {
        return this.bookService.remove(id);
    }
}

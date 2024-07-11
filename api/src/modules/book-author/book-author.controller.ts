import { Controller, Get, Param } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';

@Controller('book-author')
export class BookAuthorController {
    constructor(private readonly bookAuthorService: BookAuthorService) {}

    @Get()
    findAll() {
        return this.bookAuthorService.findAllBooksAndAuthors();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookAuthorService.findOne(+id);
    }
}

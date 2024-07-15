import { Controller, Delete, Get, Param } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';

@Controller('book-author')
export class BookAuthorController {
    constructor(private readonly bookAuthorService: BookAuthorService) {}

    // For testing purposes
    @Get()
    findAll() {
        return this.bookAuthorService.findAllBooksAndAuthors();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookAuthorService.removeBook(id);
    }
}

import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/modules/book/dto/create-book.dto';

@Injectable()
export class BookDbLibService {
    private BooksArray: CreateBookDto[] = [];

    createBook(book: CreateBookDto) {
        this.BooksArray.push(book);
    }
}

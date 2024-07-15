import { BookEntity } from '../entities/book.entity';

export class BookDto implements BookEntity {
    id: string;
    title: string;
    description: string;
    isbn: string;
}

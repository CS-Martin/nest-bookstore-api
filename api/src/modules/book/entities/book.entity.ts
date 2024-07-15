import { Book as BookModel } from '@prisma/client';

export class BookEntity implements BookModel {
    id: string;
    title: string;
    description: string;
    isbn: string;
    authors: string[];
    createdAt: Date;
    updatedAt: Date;
}

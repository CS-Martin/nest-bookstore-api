export class CreateBookDto {
    id?: number;
    title: string;
    description: string;
    isbn: string;
    author: string[];
}